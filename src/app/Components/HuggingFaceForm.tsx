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

const SubmitModelForm = () => {
  const methods = useForm({
    defaultValues: {
      task_id: "",
      flock_api_key: "",
      hg_repo_id: "",
      base_model: "gemma",
    },
  });

  const { handleSubmit } = methods;

  const onSubmit = async (data: any) => {
    const response = await fetch(
      "https://fed-ledger-prod.flock.io/api/v1/tasks/submit-result",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "flock-api-key": data.flock_api_key,
        },
        body: JSON.stringify({
          task_id: data.task_id,
          data: {
            hg_repo_id: data.hg_repo_id,
            base_model: data.base_model,
          },
        }),
      }
    );

    if (response.ok) {
      toast.success("Model submitted successfully!");
    } else {
      toast.error("Failed to submit model.");
    }
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
          <FormLabel>HG_REPO_ID</FormLabel>
          <Controller
            name="hg_repo_id"
            control={methods.control}
            render={({ field }) => (
              <Input
                placeholder="Enter Hugging Face Repo ID"
                {...field}
                required
              />
            )}
          />
          <FormDescription>
            This is the ID of your Hugging Face repository.
          </FormDescription>
          <FormMessage />
        </FormItem>

        <FormItem>
          <FormLabel>BASE_MODEL</FormLabel>
          <Controller
            name="base_model"
            control={methods.control}
            render={({ field }) => <Input {...field} readOnly />}
          />
          <FormDescription>The base model being used.</FormDescription>
          <FormMessage />
        </FormItem>

        <Button type="submit">Submit</Button>
      </form>
    </FormProvider>
  );
};

export default SubmitModelForm;
