"use client";

import axios from "axios";
import { Assets, Color } from "@prisma/client";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
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
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Wand2, Circle, FileText, Palette, ImageIcon } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Value } from "@radix-ui/react-select";
import ImagesDialog from "./images-dialog";

const ADDON = [
  { id: "1", name: "Seal", selected: true },
  { id: "2", name: "Promotion", selected: false },
  { id: "3", name: "Countdown", selected: false },
  { id: "4", name: "Emoticon", selected: false },
  { id: "5", name: "Stopper", selected: false },
  { id: "6", name: "Reassurance", selected: false },
  { id: "7", name: "Convinience", selected: false },
];

const COUNTRY = [
  { id: "1", name: "Germany", selected: true },
  { id: "2", name: "Spain", selected: false },
  { id: "3", name: "Spain", selected: false },
];

const LANGUAGE = [
  { id: "1", name: "German", selected: true },
  { id: "2", name: "Spanish", selected: false },
  { id: "3", name: "Italian", selected: false },
  { id: "4", name: "French", selected: false },
];

interface AssetFormProps {
  projectId: string;
  initialData: Assets | null;
}

const formSchema = z.object({
  projectId: z.string().min(1, {
    message: "Project ID is required.",
  }),
  statusId: z.coerce.number(),
  headline: z.string().min(1, {
    message: "Status is required.",
  }),
  subline: z.string().min(1, {
    message: "Subline is required.",
  }),
  backgraundColor: z.string().min(1, {
    message: "Backgraund Color Format is required.",
  }),
  headlineColor: z.string().min(1, {
    message: "Headline Color is required.",
  }),
  sublineColor: z.string().min(1, {
    message: "subline Color is required.",
  }),
  image: z.string().min(1, {
    message: "Image is required.",
  }),
  logo: z.string().min(1, {
    message: "Logo is required.",
  }),
  badged: z.string().min(1, {
    message: "Badged is required.",
  }),
  qr: z.string().min(1, {
    message: "QR is required.",
  }),
  country: z.string().min(1, {
    message: "country is required.",
  }),
  addOn: z.string().min(1, {
    message: "addOn is required.",
  }),
  language: z.string().min(1, {
    message: "language is required.",
  }),
  creativeImagePerson: z.string().min(1, {
    message: "creativeImagePerson is required.",
  }),
  creativeImageScreen: z.string().min(1, {
    message: "country is required.",
  }),
  messagingBenefits: z.string().min(1, {
    message: "messagingBenefits is required.",
  }),
  tonality: z.string().min(1, {
    message: "tonality is required.",
  }),
  addressedGroup: z.string().min(1, {
    message: "AddressedGroup is required.",
  }),
  creativeImageText: z.string().min(1, {
    message: "creativeImageText is required.",
  }),
  uniqueText: z.string().min(1, {
    message: "uniqueText is required.",
  }),
});

const AssetForm = ({ initialData, projectId }: AssetFormProps) => {
  const { toast } = useToast();
  const [colors, setColors] = useState([]);

  const router = useRouter();

  console.log(initialData);

  useEffect(() => {
    (async () => {
      const colors = await axios.get("http://localhost:3000/api/colors");
      setColors(colors.data);
    })();
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),

    defaultValues: initialData || {
      projectId: projectId,
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
      country: "",
      addOn: "",
      language: "",
      creativeImagePerson: "",
      creativeImageScreen: "",
      messagingBenefits: "",
      tonality: "",
      addressedGroup: "",
      creativeImageText: "",
      uniqueText: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  // const onClickHandle = () => {
  //   console.log("on Submit", initialData);
  // };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      console.log("on Submit", initialData);
      if (initialData) {
        console.log("PATCH ", values);
        await axios.patch(`/api/assets/${initialData.id}`, values);
      } else {
        console.log("POST ", values);
        await axios.post("/api/assets/", values);
      }
      router.refresh();
      router.push(`/projects/${projectId}/assets`);
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

  function CardText() {
    return (
      <Card className="w-[100%]">
        <CardHeader>
          <CardTitle className="flex gap-x-2">
            <FileText />
            Texts
          </CardTitle>
          <CardDescription></CardDescription>
        </CardHeader>

        <CardContent>
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
        </CardContent>
        <CardFooter className="flex justify-between"></CardFooter>
      </Card>
    );
  }

  function CardColor() {
    return (
      <Card className="w-[100%]">
        <CardHeader>
          <CardTitle className="flex gap-x-2">
            <Palette />
            Colors
          </CardTitle>
          <CardDescription></CardDescription>
        </CardHeader>
        <CardContent className="flex gap-x-20">
          <FormField
            name="backgraundColor"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Backgraund</FormLabel>
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
                    <ColorsList colors={colors}></ColorsList>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="headlineColor"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Headline</FormLabel>
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
                    <ColorsList colors={colors}></ColorsList>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="sublineColor"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Subline</FormLabel>
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
                    <ColorsList colors={colors}></ColorsList>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </CardContent>
        <CardFooter className="flex justify-between"></CardFooter>
      </Card>
    );
  }

  const AssetsImage = ({ title }) => {
    return (
      <div>
        <p>{title}</p>
        <div className="space-y-4 w-full flex flex-col justify-center items-center">
          <div
            className="
      p-4 
      border-4 
      border-dashed
      border-primary/10 
      rounded-lg 
      hover:opacity-75 
      transition 
      flex 
      flex-col 
      space-y-2 
      items-center 
      justify-center
    "
          >
            <div className="relative h-40 w-40">
              <Image
                fill
                alt="Upload"
                src={"" || "/placeholder.svg"}
                className="rounded-lg object-cover"
              />
            </div>
          </div>{" "}
        </div>
        <ImagesDialog></ImagesDialog>
      </div>
    );
  };

  function CardImage() {
    return (
      <Card className="w-[100%]">
        <CardHeader>
          <CardTitle className="flex gap-x-2">
            <ImageIcon />
            Images
          </CardTitle>
          <CardDescription></CardDescription>
        </CardHeader>
        <CardContent className="flex gap-x-20">
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

          <AssetsImage title="Image"></AssetsImage>
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

          <AssetsImage title="Logo"></AssetsImage>
          <FormField
            name="badged"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>badged</FormLabel>
                <FormControl>
                  <Input disabled={isLoading} placeholder="" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <AssetsImage title="Badged"></AssetsImage>
        </CardContent>
        <CardFooter className="flex justify-between"></CardFooter>
      </Card>
    );
  }

  const ButtonGroup = ({
    buttons = [],
    value = "",
    onValueChange = () => {},
  }: any) => {
    // const [buttons, setButtons] = useState(initialButtons);
    const [currentValue, setCurrentValue] = useState(value);

    useEffect(() => {
      console.log("ButtonGroup defaultValue ", currentValue);
      // console.log("ButtonGroup buttons ", buttons);
      // if (initialButtons.length === 0) {
      //   return;
      // }
      // const buttons = initialButtons.map((element) => {
      //   if (element.id === defaultValue) {
      //     return { ...element, selected: true };
      //   } else {
      //     return { ...element, selected: false };
      //   }
      // });

      // const isSelected = buttons.some((item) => item.selected);

      // if (!isSelected) {
      //   console.log(initialButtons);
      //   // initialAddons[0].selected = true;
      // }

      // setButtons(buttons);
    }, [currentValue]);

    const handleClick = (item, e) => {
      e.preventDefault();
      setCurrentValue(item.id);
      onValueChange(item.id);
    };

    // const handleClick = (item, e: Event) => {
    //   e.preventDefault();
    //   // e.stopPropagation();

    //   const btns = buttons.map((element) => {
    //     if (element.id === item.id) {
    //       return { ...element, selected: true };
    //     } else {
    //       return { ...element, selected: false };
    //     }
    //   });

    //   setButtons(btns);
    //   setCurrentValue(item.id);
    //   onValueChange(item, btns);
    // };

    return (
      <div className="flex gap-x-2">
        {buttons.map((item) => (
          <Button
            key={item.id}
            variant={item.id === currentValue ? "default" : "outline"}
            size="sm"
            onClick={() => handleClick(item, event)}
          >
            {item.name}
          </Button>
        ))}
      </div>
    );
  };

  function CardAddOn({ items = [], onValueChange = () => {} }: any) {
    useEffect(() => {
      console.log("CardAddOn useEffect", items);
    }, []);

    return (
      <Card className="w-[100%]">
        <CardHeader>
          <CardTitle className="flex gap-x-2">
            <FileText />
            AddOn
          </CardTitle>
          <CardDescription></CardDescription>
        </CardHeader>

        <CardContent>
          <>
            <FormField
              name="addOn"
              control={form.control}
              render={({ field }) => {
                const handleOnChange = (value: string) => {
                  console.log("FormField ", value);
                  // setValue(value);
                  field.onChange(value);
                };

                return (
                  <FormItem>
                    <FormControl style={{ display: "none" }}>
                      <Input disabled={isLoading} placeholder="" {...field} />
                    </FormControl>
                    <ButtonGroup
                      buttons={items}
                      value={field.value}
                      onValueChange={handleOnChange}
                    ></ButtonGroup>

                    <FormMessage />
                  </FormItem>
                );
              }}
            />
          </>
        </CardContent>
        <CardFooter className="flex justify-between"></CardFooter>
      </Card>
    );
  }

  function CardCountry({ items = [] }: any) {
    useEffect(() => {
      console.log("CardCountry useEffect", items);
    }, []);

    return (
      <Card className="w-[100%]">
        <CardHeader>
          <CardTitle className="flex gap-x-2">
            <FileText />
            Country
          </CardTitle>
          <CardDescription></CardDescription>
        </CardHeader>

        <CardContent>
          <>
            <FormField
              name="country"
              control={form.control}
              render={({ field }) => {
                const handleOnChange = (value: string) => {
                  console.log("FormField ", value);
                  // setValue(value);
                  field.onChange(value);
                };

                return (
                  <FormItem>
                    <FormControl>
                      <Input disabled={isLoading} placeholder="" {...field} />
                    </FormControl>
                    <ButtonGroup
                      buttons={items}
                      value={field.value}
                      onValueChange={handleOnChange}
                    ></ButtonGroup>

                    <FormMessage />
                  </FormItem>
                );
              }}
            />
          </>
        </CardContent>
        <CardFooter className="flex justify-between"></CardFooter>
      </Card>
    );
  }

  const MetaData = () => {
    const [addOn, setAddOn] = useState(ADDON);

    const handleOnChange = (value, btns) => {
      setAddOn(btns);
    };

    return (
      <div className="flex flex-col gap-y-2">
        {/* <FormField
          name="country"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Country</FormLabel>
              <FormControl>
                <Input disabled={isLoading} placeholder="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        /> */}
        <CardCountry items={COUNTRY}></CardCountry>
        {/* <ButtonGroup initialButtons={addOn}></ButtonGroup> */}
        <CardAddOn items={addOn} onValueChange={handleOnChange}></CardAddOn>

        <FormField
          name="language"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Language</FormLabel>
              <FormControl>
                <Input disabled={isLoading} placeholder="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="creativeImagePerson"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Creative Image Person</FormLabel>
              <FormControl>
                <Input disabled={isLoading} placeholder="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="creativeImageScreen"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Creative Image Screen</FormLabel>
              <FormControl>
                <Input disabled={isLoading} placeholder="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="messagingBenefits"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Messaging Benefits</FormLabel>
              <FormControl>
                <Input disabled={isLoading} placeholder="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="tonality"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tonality</FormLabel>
              <FormControl>
                <Input disabled={isLoading} placeholder="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="addressedGroup"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Addressed Group</FormLabel>
              <FormControl>
                <Input disabled={isLoading} placeholder="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="creativeImageText"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Creative Image Text</FormLabel>
              <FormControl>
                <Input disabled={isLoading} placeholder="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="uniqueText"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Unique Text</FormLabel>
              <FormControl>
                <Input disabled={isLoading} placeholder="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    );
  };

  const ColorsList = ({ colors }) => {
    const brands: any = {};
    colors.forEach((color: Color) => {
      if (!brands.hasOwnProperty(color.brand)) {
        brands[color.brand] = [];
      }
      brands[color.brand].push(color);
    });

    console.log(brands);
    return (
      <>
        {Object.entries(brands).map((brand: any, index) => {
          return (
            <SelectGroup key={index}>
              <SelectLabel>{brand[0]}</SelectLabel>
              {brand[1].map((color: Color, index: number) => (
                <SelectItem key={index} value={color.id}>
                  <div className="flex items-center gap-x-2">
                    <Circle color="#dfdfdf" fill={color.hex} />
                    {color.hex}
                  </div>
                </SelectItem>
              ))}
            </SelectGroup>
          );
        })}
      </>
    );
  };

  const DataForm = () => {
    return (
      <>
        <div className="flex flex-col gap-y-2">
          <FormField
            name="projectId"
            control={form.control}
            render={({ field }) => (
              <FormItem
                className="col-span-2 md:col-span-1"
                style={{ display: "none" }}
              >
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
          <FormField
            name="statusId"
            control={form.control}
            render={({ field }) => (
              <FormItem style={{ display: "none" }}>
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
          />
          <CardText></CardText>
          {/* <FormField
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
          /> */}
          <CardColor></CardColor>
          {/* <FormField
            name="backgraundColor"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Backgraund Color</FormLabel>
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
                    <ColorsList colors={colors}></ColorsList>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="headlineColor"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Headline Color</FormLabel>
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
                    <ColorsList colors={colors}></ColorsList>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="sublineColor"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Subline Color</FormLabel>
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
                    <ColorsList colors={colors}></ColorsList>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          /> */}
          <CardImage></CardImage>
          {/* <FormField
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
          /> */}
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
          {/* <FormField
            name="badged"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>badged</FormLabel>
                <FormControl>
                  <Input disabled={isLoading} placeholder="" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          /> */}
        </div>
        <ImagesDialog></ImagesDialog>
      </>
    );
  };

  return (
    <div className="h-full p-4 space-y-2 mx-auto">
      <div className="space-y-2 w-full col-span-2">
        <div>
          <h3 className="text-lg font-medium">Asset Information</h3>
          <p className="text-sm text-muted-foreground">
            General Information about your Asset
          </p>
        </div>
        <Separator className="bg-primary/10"></Separator>
      </div>
      <Form {...form}>
        <form
          className="space-y-8 pb-10"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <Tabs defaultValue="data">
            <TabsList>
              <TabsTrigger value="data">Data</TabsTrigger>
              <TabsTrigger value="metadata">Metadata</TabsTrigger>
            </TabsList>
            <TabsContent value="data">
              <DataForm></DataForm>
            </TabsContent>
            <TabsContent value="metadata">
              <MetaData></MetaData>
            </TabsContent>
          </Tabs>
          <div className="w-full flex justify-center">
            <Button size="lg" disabled={isLoading}>
              {initialData ? "Edit your asset" : "Create your asset"}
              <Wand2 className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default AssetForm;
