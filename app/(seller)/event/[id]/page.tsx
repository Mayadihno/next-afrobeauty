import { Metadata } from "next";
import React from "react";
import EventDetails from "../../_components/event/EventDetails";

export const metadata: Metadata = {
  title: "Event Details",
  description: "Event Details : MayaBeauty store",
};

const page = ({ params }: { params: { id: string } }) => {
  return (
    <div>
      <EventDetails eventId={params.id} />
    </div>
  );
};

export default page;
