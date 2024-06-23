import React from "react";
import { useForm, FormProvider, Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "react-toast";

const LLMTaskForm = () => {
  const methods = useForm({
    defaultValues: {
      task_id: "",
      flock_api_key: "",
      hf_token: "",
      cuda_visible_devices: 0,
      hf_username: "",
    },
  });

  const { handleSubmit } = methods;

  const onSubmit = async (data: any) => {
    console.log(data);
    toast.success("Deployment Started Successfully");
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <FormItem>
          <FormLabel>TASK_ID</FormLabel>
          <Controller
            name="task_id"
            control={methods.control}
            render={({ field }) => (
              <Input placeholder="Enter Task ID" {...field} required />
            )}
          />
          <FormDescription>
            This is the unique identifier for the task.
          </FormDescription>
          <FormMessage />
        </FormItem>

        <FormItem>
          <FormLabel>FLOCK_API_KEY</FormLabel>
          <Controller
            name="flock_api_key"
            control={methods.control}
            render={({ field }) => (
              <Input placeholder="Enter Flock API Key" {...field} required />
            )}
          />
          <FormDescription>
            This is the API key for Flock integration.
          </FormDescription>
          <FormMessage />
        </FormItem>

        <FormItem>
          <FormLabel>HF_TOKEN</FormLabel>
          <Controller
            name="hf_token"
            control={methods.control}
            render={({ field }) => (
              <Input placeholder="Enter HF Token" {...field} required />
            )}
          />
          <FormDescription>This is the Hugging Face token.</FormDescription>
          <FormMessage />
        </FormItem>

        <FormItem>
          <FormLabel>HF_USERNAME</FormLabel>
          <Controller
            name="hf_username"
            control={methods.control}
            render={({ field }) => (
              <Input placeholder="Enter HF Username" {...field} required />
            )}
          />
          <FormDescription>This is your Hugging Face username.</FormDescription>
          <FormMessage />
        </FormItem>

        <Button type="submit">Submit</Button>
      </form>
    </FormProvider>
  );
};

export default LLMTaskForm;
