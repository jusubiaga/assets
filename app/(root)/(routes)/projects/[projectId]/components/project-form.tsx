"use client";

import axios from "axios";
import { Channel, Country, OutputFormat, Project } from "@prisma/client";
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
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ArrowLeftCircle, Wand2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

interface ProjectFormProps {
  initialData: Project | null;
}

const formSchema = z.object({
  name: z.string().min(1, {
    message: "Name is required.",
  }),
  description: z.string().min(1, {
    message: "Description is required.",
  }),
  countryId: z.string().min(1, {
    message: "Country is required.",
  }),
  outputFormatId: z.string().min(1, {
    message: "Output Format is required.",
  }),
  collection: z.string().min(1, {
    message: "Collection is required.",
  }),
  imagesCollection: z.string().min(1, {
    message: "Images Collection is required.",
  }),
  logoCollection: z.string().min(1, {
    message: "Description is required.",
  }),
  badgeCollection: z.string().min(1, {
    message: "Description is required.",
  }),
  placidTemplate: z.string().min(1, {
    message: "Description is required.",
  }),
  channelId: z.string().min(1, {
    message: "Description is required.",
  }),
  // userId: z.string().min(1, {
  //   message: "Description is required.",
  // }),
  // createdAt: z.date(),
  // updatedAt: z.date(),
});

const COUNTRY = [
  { id: "1", name: "Germany" },
  { id: "2", name: "Spain" },
  { id: "3", name: "Italy" },
  { id: "4", name: "Australia" },
];

const OUTPUTFORMAT = [
  { id: "1", name: "Image" },
  { id: "2", name: "Animation" },
  { id: "3", name: "Video Composition" },
];

const COLLECTION = [
  { id: "1", name: "Collection 1" },
  { id: "2", name: "Collection 2" },
  { id: "3", name: "Collection 3" },
  { id: "4", name: "Collection 4" },
  { id: "5", name: "Collection 5" },
];

const IMAGESCOLLECTION = [
  { id: "1", name: "Imagen Collection 1" },
  { id: "2", name: "Imagen Collection 2" },
  { id: "3", name: "Imagen Collection 3" },
  { id: "4", name: "Imagen Collection 4" },
  { id: "5", name: "Imagen Collection 5" },
];

const BADGECOLLECTION = [
  { id: "1", name: "Logo Collection 1" },
  { id: "2", name: "Logo Collection 2" },
  { id: "3", name: "Logo Collection 3" },
  { id: "4", name: "Logo Collection 4" },
  { id: "5", name: "Logo Collection 5" },
];

const LOGOCOLLECTION = [
  { id: "1", name: "Badge Collection 1" },
  { id: "2", name: "Badge Collection 2" },
  { id: "3", name: "Badge Collection 3" },
  { id: "4", name: "Badge Collection 4" },
  { id: "5", name: "Badge Collection 5" },
];

const PLACIDTEMPLATE = [
  { id: "1", name: "Placid Template 1" },
  { id: "2", name: "Placid Template 2" },
  { id: "3", name: "Placid Template 3" },
  { id: "4", name: "Placid Template 4" },
  { id: "5", name: "Placid Template 5" },
];

const CHANNEL = [
  { id: "1", name: "Goolge" },
  { id: "2", name: "Spotify" },
  { id: "3", name: "Tik Tok" },
  { id: "4", name: "Offline" },
  { id: "5", name: "Placid Template 5" },
];

const getChannels = async () => {
  const channels = await axios.get("http://localhost:3000/api/channels");
  console.log(channels.data);
  return channels.data;
};

// export function SelectScrollable({ data }) {
//   return (
//     <Select>
//       <SelectTrigger className="w-[280px]">
//         <SelectValue placeholder="Select a timezone" />
//       </SelectTrigger>
//       <SelectContent>
//         <SelectGroup>
//           <SelectLabel>North America</SelectLabel>
//           <SelectItem value="est">Eastern Standard Time (EST)</SelectItem>
//           <SelectItem value="cst">Central Standard Time (CST)</SelectItem>
//           <SelectItem value="mst">Mountain Standard Time (MST)</SelectItem>
//           <SelectItem value="pst">Pacific Standard Time (PST)</SelectItem>
//           <SelectItem value="akst">Alaska Standard Time (AKST)</SelectItem>
//           <SelectItem value="hst">Hawaii Standard Time (HST)</SelectItem>
//         </SelectGroup>
//         <SelectGroup>
//           <SelectLabel>Europe & Africa</SelectLabel>
//           <SelectItem value="gmt">Greenwich Mean Time (GMT)</SelectItem>
//           <SelectItem value="cet">Central European Time (CET)</SelectItem>
//           <SelectItem value="eet">Eastern European Time (EET)</SelectItem>
//           <SelectItem value="west">
//             Western European Summer Time (WEST)
//           </SelectItem>
//           <SelectItem value="cat">Central Africa Time (CAT)</SelectItem>
//           <SelectItem value="eat">East Africa Time (EAT)</SelectItem>
//         </SelectGroup>
//         <SelectGroup>
//           <SelectLabel>Asia</SelectLabel>
//           <SelectItem value="msk">Moscow Time (MSK)</SelectItem>
//           <SelectItem value="ist">India Standard Time (IST)</SelectItem>
//           <SelectItem value="cst_china">China Standard Time (CST)</SelectItem>
//           <SelectItem value="jst">Japan Standard Time (JST)</SelectItem>
//           <SelectItem value="kst">Korea Standard Time (KST)</SelectItem>
//           <SelectItem value="ist_indonesia">
//             Indonesia Central Standard Time (WITA)
//           </SelectItem>
//         </SelectGroup>
//         <SelectGroup>
//           <SelectLabel>Australia & Pacific</SelectLabel>
//           <SelectItem value="awst">
//             Australian Western Standard Time (AWST)
//           </SelectItem>
//           <SelectItem value="acst">
//             Australian Central Standard Time (ACST)
//           </SelectItem>
//           <SelectItem value="aest">
//             Australian Eastern Standard Time (AEST)
//           </SelectItem>
//           <SelectItem value="nzst">New Zealand Standard Time (NZST)</SelectItem>
//           <SelectItem value="fjt">Fiji Time (FJT)</SelectItem>
//         </SelectGroup>
//         <SelectGroup>
//           <SelectLabel>South America</SelectLabel>
//           <SelectItem value="art">Argentina Time (ART)</SelectItem>
//           <SelectItem value="bot">Bolivia Time (BOT)</SelectItem>
//           <SelectItem value="brt">Brasilia Time (BRT)</SelectItem>
//           <SelectItem value="clt">Chile Standard Time (CLT)</SelectItem>
//         </SelectGroup>
//       </SelectContent>
//     </Select>
//   );
// }
const ProjectForm = ({ initialData }: ProjectFormProps) => {
  const { toast } = useToast();
  const router = useRouter();
  const [channels, setChannels] = useState([]);
  const [countries, setCountries] = useState([]);
  const [outputFormats, setOutputFormats] = useState([]);
  const [collections, setCollections] = useState([]);

  const vel = useMemo(() => {
    console.log("cambio !");
    (async () => {
      const channels = await axios.get("http://localhost:3000/api/channels");
      setChannels(channels.data);
    })();
    (async () => {
      const countries = await axios.get("http://localhost:3000/api/countries");
      setCountries(countries.data);
    })();
    (async () => {
      const outputFormats = await axios.get(
        "http://localhost:3000/api/output-formats"
      );
      setOutputFormats(outputFormats.data);
    })();
    (async () => {
      const collections = await fetch("http://localhost:3000/api/collections");
      const data = await collections.json();
      setCollections(data);
    })();
  }, []);

  const listCollections = useMemo(() => {
    console.log("load list collections");
    return collections.map((collection) => (
      <SelectItem key={collection.id} value={collection.id}>
        {collection.name}
      </SelectItem>
    ));
  }, [collections]);
  useEffect(() => {
    // (async () => {
    //   const channels = await axios.get("http://localhost:3000/api/channels");
    //   setChannels(channels.data);
    // })();
    // (async () => {
    //   const countries = await axios.get("http://localhost:3000/api/countries");
    //   setCountries(countries.data);
    // })();
    // (async () => {
    //   const outputFormats = await axios.get(
    //     "http://localhost:3000/api/output-formats"
    //   );
    //   setOutputFormats(outputFormats.data);
    // })();
    // (async () => {
    //   const collections = await fetch("http://localhost:3000/api/collections");
    //   const data = await collections.json();
    //   setCollections(data);
    // })();
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),

    defaultValues: initialData || {
      name: "",
      description: "",
      countryId: "",
      outputFormatId: "",
      collection: "",
      imagesCollection: "",
      logoCollection: "",
      badgeCollection: "",
      placidTemplate: "",
      channelId: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      console.log(initialData);
      if (initialData) {
        await axios.patch(`/api/projects/${initialData.id}`, values);
        // router.refresh();
        // router.push("/projects");
      } else {
        await axios.post("/api/projects/", values);
        // router.push("/assets");
      }
      toast({
        description: "Success",
        duration: 2000,
      });

      router.refresh();
      router.push("/");
    } catch (e) {
      toast({
        variant: "destructive",
        description: "Something went wrong",
        duration: 3000,
      });
    }
  };

  const handleGoProjects = (e: any) => {
    e.preventDefault();
    router.replace("/");
  };

  return (
    <div className="h-full p-4 space-y-2 mx-auto">
      {/* <SelectScrollable data={collections}></SelectScrollable> */}
      <Form {...form}>
        <form
          className="space-y-8 pb-10"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <div className="space-y-2 w-full col-span-2">
            <div>
              <h3 className="text-lg font-medium">Project Information</h3>
              <p className="text-sm text-muted-foreground">
                General Information about your Project
              </p>
            </div>
            <Separator className="bg-primary/10"></Separator>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem className="col-span-2 md:col-span-1">
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      placeholder="Project name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="description"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input disabled={isLoading} placeholder="" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="outputFormatId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Output Format</FormLabel>
                  <Select
                    disabled={isLoading}
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="bg-background">
                        <SelectValue
                          defaultValue={field.value}
                          placeholder="Select a category"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {outputFormats.map((outputFormat: OutputFormat) => (
                        <SelectItem
                          key={outputFormat.id}
                          value={outputFormat.id}
                        >
                          {outputFormat.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="collection"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Collection</FormLabel>
                  <Select
                    disabled={isLoading}
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="bg-background">
                        <SelectValue
                          defaultValue={field.value}
                          placeholder="Select a category"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="overflow-y-auto max-h-[10rem]">
                      {listCollections}
                      {/* {collections.map((collection) => (
                        <SelectItem key={collection.id} value={collection.id}>
                          {collection.name}
                        </SelectItem>
                      ))} */}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="imagesCollection"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Imagen Collection</FormLabel>
                  <Select
                    disabled={isLoading}
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="bg-background">
                        <SelectValue
                          defaultValue={field.value}
                          placeholder="Select a category"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="overflow-y-auto max-h-[10rem]">
                      {collections.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="logoCollection"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Logo Collection</FormLabel>
                  <Select
                    disabled={isLoading}
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="bg-background">
                        <SelectValue
                          defaultValue={field.value}
                          placeholder="Select a category"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="overflow-y-auto max-h-[10rem]">
                      {collections.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="badgeCollection"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>badge Collection</FormLabel>
                  <Select
                    disabled={isLoading}
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="bg-background">
                        <SelectValue
                          defaultValue={field.value}
                          placeholder="Select a category"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="overflow-y-auto max-h-[10rem]">
                      {collections.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="placidTemplate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Placid Template</FormLabel>
                  <Select
                    disabled={isLoading}
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="bg-background">
                        <SelectValue
                          defaultValue={field.value}
                          placeholder="Select a category"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {PLACIDTEMPLATE.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="channelId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Channel</FormLabel>
                  <Select
                    disabled={isLoading}
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="bg-background">
                        <SelectValue
                          defaultValue={field.value}
                          placeholder="Select a category"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {channels.map((channel: Channel) => (
                        <SelectItem key={channel.id} value={channel.id}>
                          {channel.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="countryId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Country</FormLabel>
                  <Select
                    disabled={isLoading}
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="bg-background">
                        <SelectValue
                          defaultValue={field.value}
                          placeholder="Select a category"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {countries.map((country: Country) => (
                        <SelectItem key={country.id} value={country.id}>
                          {country.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="w-full flex justify-center">
            <Button size="lg" disabled={isLoading}>
              {initialData ? "Edit your project" : "Create your project"}
              <Wand2 className="w-4 h-4 ml-2" />
            </Button>
            <Button size="lg" onClick={handleGoProjects}>
              Go to Projects
              <ArrowLeftCircle className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ProjectForm;
