import {
  Button,
  Container,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Text,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { sendContactForm } from "../lib/api";

import Script from 'next/script'
const GTM_ID = 'GTM-5CRSZN9X';

const initValues = { name: "", email: "", phone: "", company: "", message: "" };

const initState = { isLoading: false, error: "", values: initValues };

export default function Home() {
  const toast = useToast();
  const [state, setState] = useState(initState);
  const [touched, setTouched] = useState({});

  const { values, isLoading, error } = state;


  const onBlur = ({ target }) =>
    setTouched((prev) => ({ ...prev, [target.name]: true }));

  const handleChange = ({ target }) =>
    setState((prev) => ({
      ...prev,
      values: {
        ...prev.values,
        [target.name]: target.value,
      },
    }));

  const onSubmit = async () => {

    setState((prev) => ({
      ...prev,
      isLoading: true,
    }));
    try {
      await sendContactForm(values);
      setTouched({});
      setState(initState);
      toast({
        title: "Message sent.",
        status: "success",
        duration: 2000,
        position: "top",
      });


      if (window.top) {
        window.top.location.href = "/thankyou"; // Redirect the parent frame
      } else {
        window.location.href = "/thankyou"; // Fallback in case it's not in an iframe
      }
      

    } catch (error) {
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: error.message,
      }));
    }
  };

  return (

    <>
      <style>
        {`
      html,body {
        background:#fff;
      }
      .chakra-container {
        max-width:1040px !important;
        padding:0;
        margin-top:0;
      }
      .if-form-inner {
        padding:100px;
      }

      .if-form-inner input {
        background:#fff !important;
        color:#000;
        font-size:18px;
        border-radius:4px;
        padding:10px 12px;
        height:auto;
      }

      .if-form-inner textarea {
        background:#fff !important;
        color:#000;
        font-size:18px;
        border-radius:4px;
        padding:12px 12px;
      }
      ::placeholder {
        color:#aaa;
      }

      .btn-send button {
        background:#222;
        border-radius:4px;
        font-size:20px;
        padding:8px 40px;
        border:0;
        color:#fff;
      }

      .btn-send button:hover {
        background:#000;
      }

      @media(max-width:991px){
        .if-form-inner {
          padding:60px;
        }
      }
      @media(max-width:767px){
        .if-form-inner {
          padding:40px;
        }
      }
      @media(max-width:575px){
        .if-form-inner {
          padding:40px 20px;
        }

        .if-form-inner input {
          font-size:16px;
        }
        .if-form-inner textarea {
          font-size:16px;
        }
      }

      `}
      </style>
      <div className="if-form-inner" style={{ background: "#ac2025 !important", width: "100%" }}>
        <Container maxW="450px" mt={12}>
          {error && (
            <Text color="white.300" my={4} fontSize="xl">
              {error}
            </Text>
          )}

          <FormControl isRequired isInvalid={touched.name && !values.name} mb={4}>
            <Input
              type="text"
              name="name"
              errorBorderColor="white.300"
              value={values.name}
              onChange={handleChange}
              onBlur={onBlur}
              placeholder="Name"
            />
            <FormErrorMessage>Required</FormErrorMessage>
          </FormControl>



          <FormControl isRequired isInvalid={touched.email && !values.email} mb={4}>
            <Input
              type="email"
              name="email"
              errorBorderColor="white.300"
              value={values.email}
              onChange={handleChange}
              onBlur={onBlur}
              placeholder="Email"
            />
            <FormErrorMessage>Required</FormErrorMessage>
          </FormControl>



          <FormControl mb={4} isRequired isInvalid={touched.phone && !values.phone} >
            <Input
              type="text"
              name="phone"
              errorBorderColor="white.300"
              value={values.phone}
              onChange={handleChange}
              onBlur={onBlur}
              placeholder="Phone"
            />
            <FormErrorMessage>Required</FormErrorMessage>
          </FormControl>



          <FormControl mb={4} isRequired isInvalid={touched.company && !values.company} >
            <Input
              type="text"
              name="company"
              errorBorderColor="white.300"
              value={values.company}
              onChange={handleChange}
              onBlur={onBlur}
              placeholder="Company"
            />
            <FormErrorMessage>Required</FormErrorMessage>
          </FormControl>




          <FormControl mb={4} isRequired isInvalid={touched.message && !values.message} >
            <Textarea
              type="text"
              name="message"
              rows={4}
              errorBorderColor="white.300"
              value={values.message}
              onChange={handleChange}
              onBlur={onBlur}
              placeholder="Message"
            />
            <FormErrorMessage>Required</FormErrorMessage>
          </FormControl>

          <div className="btn-send" style={{ textAlign: "center", marginTop: "50px" }}>
            <Button
              variant="outline"
              colorScheme="blue"
              isLoading={isLoading}
              disabled={
                !values.name || !values.email || !values.phone || !values.company || !values.message
              }
              onClick={onSubmit}
            >
              SEND
            </Button>
          </div>
        </Container>
      </div>
    </>
  );
}
