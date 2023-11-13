"use client";
import ApiCalls from "@@/api/ApiCalls";
import Layout from "@@/app/components/Layout";
import SideBar from "@@/app/components/SideBar";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import RestaurantForm from "./RestaurantForm";

const AddRestaurantPage = () => {
  const router = useRouter();
  const handleSubmit = (restaurant: any) => {
    ApiCalls.addRestaurant(
      restaurant,
      () => {
        toast.success("Restaurant is Added!");
        router.back();
      },
      () => {
        toast.error("Something Went Wrong!!");
      }
    );
  };

  const [menuItems, setMenuItems] = useState([]);
  useEffect(() => {
    ApiCalls.findAllMenuItems((onData: any) => {
      setMenuItems(onData.data);
    });
  }, []);
  return (
    <>
      <SideBar title="Add New restaurant" />
      <Layout>
        <RestaurantForm onSubmit={handleSubmit} />
      </Layout>
    </>
  );
};

export default AddRestaurantPage;
