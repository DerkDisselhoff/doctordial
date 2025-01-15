import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { supabase } from "@/lib/supabaseClient";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  practiceName: z.string().min(2),
});

export const ClientInviteForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "medi.mere@doctordial.io",
      password: "Demo2025!",
      practiceName: "Medi-Mere",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      // 1. Create the user account
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: values.email,
        password: values.password,
        options: {
          data: {
            role: 'client',
          },
        },
      });

      if (authError) throw authError;

      if (authData.user) {
        // 2. Update the profile with practice name
        const { error: profileError } = await supabase
          .from('profiles')
          .update({ 
            company_name: values.practiceName,
            role: 'client'
          })
          .eq('id', authData.user.id);

        if (profileError) throw profileError;

        toast.success("Client account created successfully!");
        form.reset();
      }
    } catch (error: any) {
      console.error('Error creating client:', error);
      toast.error(error.message || "Failed to create client account");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} type="email" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input {...field} type="password" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="practiceName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Practice Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">
          Create Client Account
        </Button>
      </form>
    </Form>
  );
};