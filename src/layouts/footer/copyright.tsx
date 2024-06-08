import React from "react";

import { format } from "@formkit/tempo";

import { Text } from "@/components";

export default function CopyRight() {
    return (
        <div className="grid place-items-center px-4 py-8">
            <Text variant="lg" className="!font-archivo text-gray-600 dark:text-black-800 mobile_lg:hidden">
                &copy; Matador Labs {format(new Date(), "YYYY", "en")}
            </Text>
            <Text variant="lg" className=" hidden mobile_lg:block !font-archivo text-gray-600 dark:text-black-800">
                &copy; Firebirds {format(new Date(), "YYYY", "en")}
            </Text>
        </div>
    );
}
