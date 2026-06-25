import { Section } from "lucide-react";
import {
    Radio,
    Calendar,
    Trophy,
    Users,
    Layers,
    ShieldAlert,
    BellRing,
  } from "lucide-react";

export default function QuickNav(){





    return(<Section className="grid grid-cols-5 px-5 lg:hidden">
        <div className="flex flex-col bg-[#f8fafc] gap-4 rounded-md shadow-md">
        <Radio></Radio>
        <p>LIVE</p>
        </div>
        <div className="flex flex-col bg-[#f8fafc]">
        <Radio></Radio>
        <p>LIVE</p>
        </div>
        <div className="flex flex-col bg-[#f8fafc]">
        <Radio></Radio>
        <p>LIVE</p>
        </div>
        <div className="flex flex-col bg-[#f8fafc]">
        <Radio></Radio>
        <p>LIVE</p>
        </div>
        <div className="flex flex-col bg-[#f8fafc]">
        <Radio></Radio>
        <p>LIVE</p>
        </div>


    </Section>)
}