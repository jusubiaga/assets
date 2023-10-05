"use client";

import axios from "axios";
import { Assets, Project } from "@prisma/client";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Wand2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

interface AssetFormProps {
  initialData: Assets | null;
}

// id              String   @id @default(uuid())
// project         Project  @relation(fields: [projectId], references: [id])
// projectId       String
// statusId        Int
// headline        String
// subline         String
// backgraundColor String
// headlineColor   String
// sublineColor    String
// image           String
// logo            String
// badged          String
// qr              String

const formSchema = z.object({
  projectId: z.string().min(1, {
    message: "Name is required.",
  }),
  statusId: z.number(),
  headline: z.string().min(1, {
    message: "Description is required.",
  }),
  subline: z.string().min(1, {
    message: "Country is required.",
  }),
  backgraundColor: z.string().min(1, {
    message: "Output Format is required.",
  }),
  headlineColor: z.string().min(1, {
    message: "Collection is required.",
  }),
  sublineColor: z.string().min(1, {
    message: "Images Collection is required.",
  }),
  image: z.string().min(1, {
    message: "Description is required.",
  }),
  logo: z.string().min(1, {
    message: "Description is required.",
  }),
  badged: z.string().min(1, {
    message: "Description is required.",
  }),
  qr: z.string().min(1, {
    message: "Description is required.",
  }),
  // userId: z.string().min(1, {
  //   message: "Description is required.",
  // }),
  // createdAt: z.date(),
  // updatedAt: z.date(),
});

const AssetForm = ({ initialData }: AssetFormProps) => {
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),

    defaultValues: {
      projectId: "",
      statusId: 0,
      headline: "",
      subline: "",
      backgraundColor: "",
      headlineColor: "",
      sublineColor: "",
      image: "",
      logo: "",
      badged: "",
      qr: "",
    },
  });

  const isLoading = form.formState.isSubmitting;
  const onClickHandle = () => {
    console.log("on Submit", initialData);
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      console.log("on Submit", initialData);
      if (initialData) {
        console.log("PATCH ", values);
        // await axios.patch(`/api/projects/${initialData.id}`, values);
        // router.push("/projects");
      } else {
        console.log("POST ", values);
        // await axios.post("/api/projects/", values);
        // router.push("/assets");
      }

      toast({
        description: "Success",
        duration: 3000,
      });
    } catch (e) {
      toast({
        variant: "destructive",
        description: "Something went wrong",
        duration: 3000,
      });
    }
  };
  return (
    <div className="h-full p-4 space-y-2 mx-auto">
      <Form {...form}>
        <form
          className="space-y-8 pb-10"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <div className="space-y-2 w-full col-span-2">
            <div>
              <h3 className="text-lg font-medium">Asset Information</h3>
              <p className="text-sm text-muted-foreground">
                General Information about your Asset
              </p>
            </div>
            <Separator className="bg-primary/10"></Separator>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              name="projectId"
              control={form.control}
              render={({ field }) => (
                <FormItem className="col-span-2 md:col-span-1">
                  <FormLabel>Project ID</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      placeholder="Project ID"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* <FormField
              name="statusId"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status ID</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      disabled={isLoading}
                      placeholder=""
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            /> */}

            <FormField
              name="headline"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>headline</FormLabel>
                  <FormControl>
                    <Input disabled={isLoading} placeholder="" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="subline"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>subline</FormLabel>
                  <FormControl>
                    <Input disabled={isLoading} placeholder="" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="backgraundColor"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>backgraundColor</FormLabel>
                  <FormControl>
                    <Input disabled={isLoading} placeholder="" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="headlineColor"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>headlineColor</FormLabel>
                  <FormControl>
                    <Input disabled={isLoading} placeholder="" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="sublineColor"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>sublineColor</FormLabel>
                  <FormControl>
                    <Input disabled={isLoading} placeholder="" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="image"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>image</FormLabel>
                  <FormControl>
                    <Input disabled={isLoading} placeholder="" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="logo"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>logo</FormLabel>
                  <FormControl>
                    <Input disabled={isLoading} placeholder="" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="qr"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>qr</FormLabel>
                  <FormControl>
                    <Input disabled={isLoading} placeholder="" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="w-full flex justify-center">
            <Button
              size="lg"
              disabled={isLoading}
              onClick={() => {
                onClickHandle();
              }}
            >
              {initialData ? "Edit your asset" : "Create your asset"}
              <Wand2 className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </form>
      </Form>
      <Button
        size="lg"
        disabled={isLoading}
        onClick={() => {
          onClickHandle();
        }}
      >
        {initialData ? "Edit your asset" : "Create your asset"}
        <Wand2 className="w-4 h-4 ml-2" />
      </Button>
    </div>
  );
};

export default AssetForm;
