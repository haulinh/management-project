import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Button,
  Form,
  FormGroup,
  Input,
  Label,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "reactstrap";

const positions = [
  {
    value: 1,
    label: "Hanh Chinh",
  },
  {
    value: 2,
    label: "Hoc Tap",
  },
];

export const FormAccount = ({
  onSubmit,
  onToggle,
  accountEdit,
  setAccountEdit,
}) => {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      fullName: "",
      deparment: 1,
      position: 2,
      email: "",
      userName: "",
    },
  });

  const handleSubmitForm = (data) => {
    console.log({ data });
    onSubmit(data);
  };

  const handleCancel = () => {
    onToggle();
    setAccountEdit({});
  };

  return (
    <>
      <ModalHeader>Create New Accout</ModalHeader>
      <ModalBody>
        <form onSubmit={handleSubmit(handleSubmitForm)}>
          <FormGroup>
            <Label for="email">Email</Label>
            <Controller
              name="email"
              control={control}
              render={({ field }) => <Input {...field} />}
            />
          </FormGroup>
          <FormGroup>
            <Label for="userName">User Name</Label>
            <Controller
              name="userName"
              control={control}
              render={({ field }) => (
                <Input placeholder="with a placeholder" {...field} />
              )}
            />
          </FormGroup>
          <FormGroup>
            <Label for="fullName">Full Name</Label>
            <Controller
              name="fullName"
              control={control}
              render={({ field }) => (
                <Input placeholder="with a placeholder" {...field} />
              )}
            />
          </FormGroup>
          <FormGroup>
            <Label for="department">Department</Label>
            <Controller
              name="department"
              control={control}
              render={({ field }) => (
                <Input
                  type="select"
                  placeholder="with a placeholder"
                  {...field}
                >
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                </Input>
              )}
            />
          </FormGroup>
          <FormGroup>
            <Label for="position">Position</Label>
            <Controller
              name="position"
              control={control}
              render={({ field }) => (
                <Input
                  type="select"
                  placeholder="with a placeholder"
                  {...field}
                >
                  {positions.map((position) => (
                    <option value={position.value}>{position.label}</option>
                  ))}
                </Input>
              )}
            />
          </FormGroup>
          <Button type="submit" color="primary">
            Create
          </Button>
        </form>
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={handleCancel}>
          Cancel
        </Button>
      </ModalFooter>
    </>
  );
};
