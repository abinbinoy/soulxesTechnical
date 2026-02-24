"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import guidLineImg from "@/public/sideNav01.png"
import discountImg from "@/public/discount.png"
import discountImg2 from "@/public/exclusive.png"

const SideBarAd = () => {
  return (
    <div className="w-64 space-y-4">
      <Card className="overflow-hidden pt-0">
        <div className="relative h-40 xl:h-52">
          <Image src={guidLineImg} alt="Guidelines" className="w-full h-full object-cover" fill />
        </div>
        <CardContent>
          <h3 className="text-md font-semibold mb-2">International Guidelines</h3>
          <p className="text-sm mb-3">
            COVID safety measures adopted by various countries including USA restrictions, quarantine rules, etc.
          </p>
          <Button variant="outline" className="text-primary border border-primary font-semibold p-2 h-auto text-xs w-full cursor-pointer rounded-sm">
            View guidelines
          </Button>
        </CardContent>
      </Card>

      <Card className="overflow-hidden pt-0">
        <div className="relative h-40 xl:h-52">
          <Image src={discountImg} alt="discount" className="w-full h-full object-cover" fill />
        </div>
        <CardContent>
          <h3 className="text-md font-semibold mb-2">We’ve found you a great deal!</h3>
          <p className="text-sm mb-3">
            Get more, spend less with up to $575 off when you book your flight + stay together,
          </p>
          <Button variant="outline" className="text-primary border border-primary font-semibold p-2 h-auto text-xs w-full cursor-pointer rounded-sm">
            Shop flight
          </Button>
        </CardContent>
      </Card>

      <Card className="overflow-hidden pt-0">
        <div className="relative h-40 xl:h-52">
          <Image src={discountImg2} alt="discount2" className="w-full h-full object-cover" fill />
        </div>
        <CardContent>
          <h3 className="text-md font-semibold mb-2">Log-in and get exclusive discounts!</h3>
          <p className="text-sm mb-3">
            Log in and Unlock all the exclusive offers and use wallet etc
          </p>
          <Button variant="outline" className="text-primary border border-primary font-semibold p-2 h-auto text-xs w-full cursor-pointer rounded-sm">
            Login/Create Account
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
export default SideBarAd