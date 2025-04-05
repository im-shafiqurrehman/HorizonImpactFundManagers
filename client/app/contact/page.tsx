"use client";

import { useState } from "react";
import { MapPin, Phone, Mail, MessageCircle } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import HeroBanner from "@/components/HeroBanner";
import { Fade } from "react-awesome-reveal";
import MainLayout from "@/components/Layout/MainLayout";
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";
import { object, string } from "yup";
import toast from "react-hot-toast";
import axios from "axios";
import Loader from "../components/Loader/Loader";

// Define the form values interface
interface FormValues {
  name: string;
  email: string;
  message: string;
}
export default function ContactUs() {
  const [loading, setLoading] = useState(false);

  const initialValues: FormValues = {
    name: "",
    email: "",
    message: "",
  };

  const validationSchema = object({
    name: string().required("Name is required"),
    email: string().email("Invalid email format").required("Email is required"),
    message: string().required("Message is required"),
  });

  const handleSubmit = async (
    values: FormValues, // Explicitly define the type of `values`
    { setSubmitting, resetForm }: FormikHelpers<FormValues>
  ) => {
    setSubmitting(true);
    setLoading(true);

    try {
      // Send the form data to the backend API
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URI}/send-email`, 
        {
          email: "horizonimpactfundmanagers@gmail.com", // Recipient email
          subject: "New Contact Form Submission", // Email subject
          template: "contact-template.ejs", // EJS template file
          data: { 
            name: values.name,
            email: values.email,
            message: values.message,
          },
        }
      );

      if (response.data.success) {
        toast.success("Message sent successfully!");
        resetForm(); // Reset the form after successful submission
      } else {
        toast.error("Failed to send email.");
      }
    } catch (error) {
      console.error("Error during form submission:", error);
      toast.error("An error occurred. Please try again.");
    } finally {
      setSubmitting(false);
      setLoading(false);
    }
  };
  return (
    <>
      {/* Render loader while data is being fetched */}
      {loading? (
        <Loader/>
      ) : (
    <MainLayout>
      <HeroBanner
        title={"Contact Us"}
        subtitle={"Contact"} 
        backgroundImage={"/assets/contact-banner.jpg"}
      />
      <div className="container mx-auto px-4 md:px-8 lg:px-12 py-12">
        {/* Contact Information Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {[
            {
              icon: MapPin,
              title: "Our Location",
              content: (
                <span className="text-main">Southern Africa</span>
              ),
            },
            {
              icon: Mail,
              title: "Email Us",
              content: (
                <div className="flex justify-center">
                  <a
                    href="mailto:info@HIFM.com.na "
                    className="text-main hover:underline text-[13px] text-center"
                  >
                    info@HIFM.com.na 
                  </a>
                </div>
              ),
            },
            {
              icon: Phone,
              title: "Call Us",
              content: (
                <a
                  href="tel:+264814174301"
                  className="text-main hover:underline"
                >
                  +264814174301
                </a>
              ),
            },
            {
              icon: MessageCircle,
              title: "WhatsApp Us",
              content: (
                <a
                  href="https://wa.me/+264814174301"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-main hover:underline"
                >
                 +264814174301
                </a>
              ),
            },
          ].map(({ icon: Icon, title, content }, index) => (
            <Card
              key={index}
              className="shadow-md rounded-lg border border-gray-200 bg-white"
            >
              <CardHeader className="flex flex-col items-center py-6">
                <Icon className="h-12 w-12 text-main mb-4" />
                <CardTitle className="text-xl font-semibold text-center text-gray-900">
                  {title}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                {content}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Contact Form */}
        <Fade direction="up" triggerOnce delay={0.2}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="shadow-md rounded-lg border border-gray-200 bg-white">
              <CardHeader>
                <CardTitle className="text-gray-600 font-semibold">Send Us a Message</CardTitle>
              </CardHeader>
              <CardContent>
                <Formik
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={handleSubmit}
                >
                  <Form>
                    <div className="grid gap-6 ">
                      <div className="flex flex-col">
                        <Label htmlFor="name" className="text-gray-600 mb-2">
                          Your Name
                        </Label>
                        <Field
                          id="name"
                          name="name"
                          type="text"
                          placeholder="Enter your name"
                          className="border-gray-300 w-full px-3 py-1.5 border rounded-md shadow-sm focus:ring-2 focus:ring-[#E66F3D] focus:outline-none text-gray-900"
                        />
                        <ErrorMessage
                          name="name"
                          component="div"
                          className="text-red-500 text-sm"
                        />
                      </div>

                      <div className="flex flex-col">
                        <Label htmlFor="email" className="text-gray-600 mb-2">
                          Your Email
                        </Label>
                        <Field
                          id="email"
                          name="email"
                          type="email"
                          placeholder="Enter your email"
                          className="border-gray-300 w-full mt-1 px-3 py-1.5 border rounded-md shadow-sm focus:ring-2 focus:ring-[#E66F3D] focus:outline-none text-gray-900"
                        />
                        <ErrorMessage
                          name="email"
                          component="div"
                          className="text-red-500 text-sm"
                        />
                      </div>

                      <div className="flex flex-col">
                        <Label htmlFor="message" className="text-gray-600 mb-2">
                          Your Message
                        </Label>
                        <Field
                          as="textarea"
                          id="message"
                          name="message"
                          placeholder="Write your message"
                          className="border-gray-300 min-h-40 w-full mt-1 px-3 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-[#E66F3D] focus:outline-none text-gray-900 placeholder-gray-400"
                        />
                        <ErrorMessage
                          name="message"
                          component="div"
                          className="text-red-500 text-sm"
                        />
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="px-4 py-2 mt-6 rounded-md bg-main text-white hover:bg-black transition-all duration-300 disabled:opacity-75 disabled:hover:bg-main disabled:cursor-not-allowed"
                      disabled={loading}
                    >
                      {loading ? <span>Sending...</span> : "Send Message"}
                    </button>
                  </Form>
                </Formik>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card className="shadow-md rounded-lg border border-gray-200 bg-white">
              <CardHeader>
                <CardTitle className="text-gray-600">Our Contact Information</CardTitle>
                <CardDescription className="text-gray-600">
                  Feel free to reach out to us directly.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-2 text-gray-600">
                    <MapPin className="h-5 w-5 text-main" />
                    <span>Horizon Impact Fund Managers</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-600">
                    <Phone className="h-5 w-5 text-main" />
                    <span>+264814174301</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-600">
                    <Mail className="h-5 w-5 text-main" />
                    <span>info@HIFM.com.na</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-600">
                    <MessageCircle className="h-5 w-5 text-main" />
                    <span>WhatsApp:  +264814174301</span>
                  </div>

                  <div className="mt-6">
                    <iframe
                      title="Company Location"
                      src="https://www.google.com/maps/embed?pb=..."
                      width="100%"
                      height="300"
                      style={{ border: 0 }}
                      allowFullScreen={true}
                      loading="lazy"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </Fade>
      </div>
    </MainLayout>
      )}
      </>
    );
};