"use client";

import { Button } from "@/components/ui/button";
import { FloatingInput } from "@/components/ui/floating-input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PersonalDetailPayload, personalDetailSchema } from "@/features/auth/Schema";
import { useUpdateProfile } from "@/features/auth/hooks";


type Props = {
    onNext: () => void;
    userData: any;
    setPersonalEditMode: any;
    personalEditMode: any
    setAuctionDays: any;
    auctionDays: any;
};

const PersonalInfo = ({ onNext, userData, personalEditMode, setPersonalEditMode, setAuctionDays, auctionDays }: Props) => {
    const { mutate, isPending } = useUpdateProfile()
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<PersonalDetailPayload>({
        resolver: zodResolver(personalDetailSchema),
        defaultValues: {
            firstName: userData?.firstName || "",
            lastName: userData?.lastName || "",
            email: userData?.email || "",
            phone: userData?.phone || "",
        },
    });
    const handleButtonClick = () => {
        if (personalEditMode) {
            handleSubmit(onSubmit)();
        } else {
            onNext();
        }
    };
    const onSubmit = (data: any) => {
        mutate(data, {
            onSuccess: () => {
                onNext();
            },
        })
    };

    return (
        <div className="bg-white border max-w-4xl mx-auto rounded-xl p-8 shadow-sm">
            <div className="flex items-center justify-between">

                <h3 className="font-semibold mb-6 text-2xl">Personal details</h3>

                <Button
                    variant="outline"
                    onClick={() => setPersonalEditMode(!personalEditMode)}
                >
                    {personalEditMode ? "Cancel" : "Edit"}
                </Button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid grid-cols-2 gap-4 mb-4 mt-2">
                    <div>
                        <FloatingInput
                            id="firstName"
                            label="First Name"
                            {...register("firstName")}
                            disabled={!personalEditMode}
                            error={errors.firstName?.message}
                        />

                    </div>

                    <div>
                        <FloatingInput
                            id="LastName"
                            label="Last Name"
                            {...register("lastName")}
                            disabled={!personalEditMode}
                            error={errors.lastName?.message}
                        />

                    </div>
                </div>

                <div className="mb-4">
                    <FloatingInput
                        id="email"
                        label="Email Address"
                        disabled
                        {...register("email")}
                        error={errors.email?.message}
                    />

                </div>

                <div className="mb-6 flex gap-2">
                    <div className="flex items-center px-3 border rounded-md text-sm bg-gray-50">
                        🇺🇸 +1
                    </div>

                    <div className="w-full">
                        <FloatingInput
                            id="phoneNumber"
                            label="Phone Number"
                            {...register("phone")}
                            disabled={!personalEditMode}
                            maxLength={10}
                            error={errors.phone?.message}
                        />

                    </div>
                </div>

                <Button
                    type="button"
                    className="w-full"
                    onClick={handleButtonClick}
                    disabled={isPending}
                >
                    {isPending ? "Saving..." : "Next"}
                </Button>
            </form>
        </div>
    );
};

export default PersonalInfo;