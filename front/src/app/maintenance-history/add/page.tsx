"use client";
import React, { useEffect, useState } from "react";

import { useRouter } from "next/navigation";
import SideBar from "@@/app/components/SideBar";
import Layout from "@@/app/components/Layout";
import ApiCalls from "@@/api/ApiCalls";
import toast from "react-hot-toast";
import MaintenanceHistoryFrom from "./MaintenanceHistoryFrom";

const AddMaintenanceHistoryPage = () => {
    const [Restaurants, setRestaurants] = useState([]);
    useEffect(() => {
        ApiCalls.findAllRestaurants((response: any) => {
            setRestaurants(response.data);
        });
      }, []);
  const router = useRouter();
  const handleSubmit = (data: any) => {
    ApiCalls.addMaintenanceHistory(
      data,
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
      <SideBar title="Add New Maintenance History" />
      <Layout>
        <MaintenanceHistoryFrom onSubmit={handleSubmit} Restaurants={Restaurants} />
      </Layout>
    </>
  );
};

export default AddMaintenanceHistoryPage;
