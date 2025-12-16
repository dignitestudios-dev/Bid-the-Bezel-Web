"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useState } from "react";

const MyOrders = () => {
  const [selectedTab, setSelectedTab] = useState<"orders" | "listings">(
    "orders"
  );

  type ListingType = "fixed" | "auction" | "taking-offers";

  type Fav = {
    id: string;
    title: string;
    user: string;
    price: string;
    image: string;
    type: ListingType;
    isReceived: boolean;
  };

  const items: Fav[] = [
    {
      id: "1",
      title: "Audemars Piguet Royal Oak",
      user: "Arandomuser",
      price: "$765.76",
      image: "/images/fav.jpg",
      type: "fixed",
      isReceived: true,
    },
    {
      id: "2",
      title: "Rolex Submariner Date",
      user: "WatchCollector",
      price: "$1,250.00",
      image: "/images/fav.jpg",
      type: "auction",
      isReceived: false,
    },
    {
      id: "3",
      title: "Patek Philippe Nautilus",
      user: "LuxuryHub",
      price: "$3,500",
      image: "/images/fav.jpg",
      type: "auction",
      isReceived: false,
    },
    {
      id: "4",
      title: "Omega Speedmaster Moonwatch",
      user: "TimeVault",
      price: "$980.00",
      image: "/images/fav.jpg",
      type: "taking-offers",
      isReceived: true,
    },
    {
      id: "5",
      title: "Cartier Santos Large",
      user: "EliteWatches",
      price: "$1,120.00",
      image: "/images/fav.jpg",
      type: "fixed",
      isReceived: false,
    },
    {
      id: "5",
      title: "Cartier Santos Large",
      user: "EliteWatches",
      price: "$1,120.00",
      image: "/images/fav.jpg",
      type: "fixed",
      isReceived: false,
    },
  ];

  return (
    <div className="card">
      <div className="flex items-center gap-4 border-b-2">
        <button
          className={`border-b-[3px] cursor-pointer ${
            selectedTab === "orders" ? "border-primary" : "border-transparent"
          } font-medium text-primary pb-2 transition-all`}
          onClick={() => setSelectedTab("orders")}
        >
          My Orders
        </button>
        <button
          className={`border-b-[3px] cursor-pointer ${
            selectedTab === "listings" ? "border-primary" : "border-transparent"
          } font-medium text-primary pb-2 transition-all`}
          onClick={() => setSelectedTab("listings")}
        >
          My Listings
        </button>
      </div>

      <div className="w-full pt-6">
        {selectedTab === "orders" ? (
          <div className="grid grid-cols-2 gap-5 max-h-[600px] overflow-y-auto">
            {items.map((it, index) => (
              <div className="card p-0 relative overflow-hidden">
                {it.isReceived && (
                  <div className="absolute top-3 -left-12 -rotate-45 w-[180px] text-center py-2 bg-[#14A752] border-b-4 font-medium text-white border-[#E3E3E3]">
                    Received
                  </div>
                )}

                <div key={index} className="p-3 w-full flex items-start gap-3">
                  <div className="w-24 h-24 rounded-lg overflow-hidden bg-gray-50 shrink-0">
                    <Image
                      src={it.image}
                      alt={it.title}
                      width={96}
                      height={96}
                      className="object-cover w-full h-full"
                    />
                  </div>

                  <div className="flex-1">
                    <p className="text-lg font-semibold text-end">{it.price}</p>
                    <p className="text-lg font-medium">{it.title}</p>
                  </div>
                </div>

                <div className="p-3 grid grid-cols-2 gap-5">
                  <Button variant={"outline"}>Track Courier</Button>
                  <Button>Track</Button>
                </div>

                <div
                  className={`p-3 text-white font-medium text-center  ${
                    it.type === "auction"
                      ? "bg-[#415A77]"
                      : it.type === "fixed"
                      ? "bg-[#778DA9]"
                      : "bg-[#D9B918]"
                  }`}
                >
                  {it.type === "auction"
                    ? "Auction"
                    : it.type === "fixed"
                    ? "Fixed"
                    : "Taking Offers"}
                </div>
              </div>
            ))}
          </div>
        ) : selectedTab === "listings" ? (
          <div>
            <div className="bg-[#F7F7F7] p-2 rounded-xl space-x-2 w-fit">
              <Button className={`bg-white text-primary font-medium`}>
                Unfulfilled
              </Button>
              <Button className={`bg-white text-primary font-medium`}>
                Fulfilled
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-5 max-h-[600px] overflow-y-auto">
              <div>Hello 123</div>
              <div>Hello 123</div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default MyOrders;


// exports.sendUnreadMessageReminders = onSchedule(
//   {
//     schedule: "0 * * * *", // ⏰ every hour at minute 0
//     timeZone: "America/Chicago", // US Central Time
//     region: "us-central1",
//   },
//   // eslint-disable-next-line no-unused-vars
//   async () => {
//     try {
//       logger.info("📦 Fetching reminder settings from Firestore...");
//       const settingsRef = db.collection("settings").doc("reminder");
//       const settingsSnap = await settingsRef.get();
 
//       if (!settingsSnap.exists) {
//         logger.warn(
//           "⚠️ Reminder settings document not found (settings/reminder). Exiting..."
//         );
//         return null;
//       }
 
//       const reminderData = settingsSnap.data();
//       const reminderDays = reminderData.days || 0;
//       const reminderHours = reminderData.hours || 0;
 
//       // Convert to milliseconds
//       const cutoffMs =
//         reminderDays * 24 * 60 * 60 * 1000 + reminderHours * 60 * 60 * 1000;
 
//       const now = new Date();
//       const cutoffDate = new Date(now - cutoffMs);
 
//       logger.info(
//         `🕒 Reminder threshold set to ${reminderDays} days (${cutoffMs} ms). Cutoff date: ${cutoffDate.toISOString()}`
//       );
 
//       // ✅ Get the oldest message older than cutoffDate (limit 1)
//       logger.info("📨 Fetching oldest message older than cutoff date...");
//       const oldMessageSnap = await db
//         .collection("message")
//         .where("createdAt", "<", cutoffDate)
//         .where("isReminder", "==", false)
//         .orderBy("createdAt", "asc")
//         .limit(1)
//         .get();
 
//       if (oldMessageSnap.empty) {
//         logger.info(
//           "✅ No messages older than threshold found — skipping reminders."
//         );
//         return null;
//       }
 
//       const oldMessageDoc = oldMessageSnap.docs[0];
//       const oldMessage = oldMessageDoc.data();
//       logger.info(
//         `📄 Oldest message for reminder found: ID=${oldMessageDoc.id}, createdAt=${oldMessage.createdAt}`
//       );
 
//       // 2️⃣ Process employees in batches
//       logger.info("👥 Starting to fetch and process employees in batches...");
//       const employeesRef = db.collection("employee");
//       const batchSize = 50;
//       let lastDoc = null;
//       let totalProcessed = 0;
//       let countReminded = 0;
//       let batchCount = 0;
 
//       // eslint-disable-next-line no-constant-condition
//       while (true) {
//         batchCount++;
 
//         let query = employeesRef.limit(batchSize);
//         if (lastDoc) query = query.startAfter(lastDoc);
 
//         const snapshot = await query.get();
//         if (snapshot.empty) {
//           logger.info(
//             "🚫 No more employee documents found. Exiting batch loop."
//           );
//           break;
//         }
 
//         logger.info(
//           `📄 Processing ${snapshot.size} employees in batch #${batchCount}...`
//         );
 
//         for (const doc of snapshot.docs) {
//           totalProcessed++;
//           const emp = doc.data();
//           const empId = emp.employeeId || "UNKNOWN_ID";
//           const empPhone = emp.contact || null;
 
//           const empName = emp.name || "Employee";
 
//           const seenArray = oldMessage.UserMsgSeen || [];
//           const hasSeen = seenArray.some((s) => s.employeeId === empId);
 
//           if (!hasSeen) {
//             logger.info(
//               `🔔 Employee ${empName} (${empId}) has UNREAD messages. Sending reminder...`
//             );
 
//             const message = `Hello ${empName}, you have an unread message pending for more than ${reminderDays} days. Please check your message portal at https://dispatch.jbsittnertruckingllc.com/ – JBST Dispatch Team`;
 
//             try {
//               await sendSms(empPhone, message);
//               countReminded++;
//               logger.info(`📱 Reminder SMS sent to ${empPhone}`);
//             } catch (e) {
//               logger.error(`❌ Failed to send SMS to ${empPhone}`, e);
//             }
//           }
//         }
 
//         lastDoc = snapshot.docs[snapshot.docs.length - 1];
//         logger.info(
//           `🧾 Finished batch #${batchCount}: processed ${snapshot.size} employees.`
//         );
//         if (snapshot.size < batchSize) {
//           logger.info("🏁 Last batch processed — no more employees left.");
//           break;
//         }
//       }
 
//       // ✅ Update the message document to mark it as reminded
//       if (oldMessageDoc && countReminded > 0) {
//         try {
//           await db.collection("message").doc(oldMessageDoc.id).update({
//             isReminder: true,
//           });
//           logger.info(
//             `✅ Updated message ${oldMessageDoc.id} with isReminder: true`
//           );
//           logger.info(
//             `📊 Reminded ${countReminded} employees about this message`
//           );
//         } catch (updateError) {
//           logger.error(
//             `❌ Failed to update message ${oldMessageDoc.id}:`,
//             updateError
//           );
//         }
//       } else if (countReminded === 0) {
//         logger.info(
//           "ℹ️ No employees needed reminders - message update skipped"
//         );
//       }
 
//       logger.info(`🎯 Completed: ${totalProcessed} employees processed.`);
//       logger.info(
//         `📱 Reminder SMS messages sent to ${countReminded} employees.`
//       );
//       logger.info(
//         "✅ [sendUnreadMessageReminders] Function completed successfully."
//       );
//       return null;
//     } catch (err) {
//       logger.error("💥 sendUnreadMessageReminders encountered an error:", err);
//       return null;
//     }
//   }
// );