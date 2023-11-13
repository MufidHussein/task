"use client";
import React from "react";

import { useRouter } from "next/navigation";
import SideBar from "@@/app/components/SideBar";
import Layout from "@@/app/components/Layout";
import ApiCalls from "@@/api/ApiCalls";
import MenuItemFrom from "./MenuItemFrom";
import toast from "react-hot-toast";

const AddMenuItemPage = () => {
  const router = useRouter();
  const handleSubmit = (Item: any) => {
    ApiCalls.addMenuItem(
      Item,
      () => {
        toast.success("Item is Added!");
        router.back();
      },
      () => {
        toast.error("Something Went Wrong!");
      }
    );
  };

  return (
    <>
      <SideBar title="Add New Menu Item" />
      <Layout>
        <MenuItemFrom onSubmit={handleSubmit} />
      </Layout>
    </>
  );
};

export default AddMenuItemPage;
