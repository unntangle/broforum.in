import { createServerClient } from "@/lib/supabase";
import MembersClient from "./MembersClient";
import type { MemberRow } from "@/lib/supabase";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Members",
  description: "Meet the 22+ business leaders of BRO Forum Chennai Chapter — one exclusive seat per industry category.",
};

export const dynamic = "force-dynamic";

// ─── Static member data — always shown even if Supabase is unavailable ────────
const STATIC_MEMBERS: MemberRow[] = [
  { id: 1,  name: "Mr. S. Virapan",          business: "SanVir Associates Pvt. Ltd.",         category: "MEP Consultant",               email: "virapans@gmail.com",             phone: "9444036627", status: "active", website: "https://sanvirassociates.com/",       photo: null, created_at: "" },
  { id: 2,  name: "Mr. V. Ramesh Kumar",      business: "Srushti - SRRE Communications",       category: "Brand & Communication Agency",  email: "ramesh@srushticonnect.com",      phone: "9444398464", status: "active", website: null,                                 photo: null, created_at: "" },
  { id: 3,  name: "Mr. S. Dinesh",            business: "RSD Foundations",                     category: "Civil Constructions & Builders", email: "dinesh@RSDfoundations.com",     phone: "9840472333", status: "active", website: "https://www.rsdfoundations.com/",     photo: null, created_at: "" },
  { id: 4,  name: "Mr. P. Manohar",           business: "Aqua Eco Green Technology Pvt. Ltd.", category: "Pumps",                         email: "mano@aquaecogreen.com",         phone: "9840066745", status: "active", website: "http://www.aquaecogreen.com/",        photo: null, created_at: "" },
  { id: 5,  name: "Mr. Sudharrson Raj",       business: "Sri Kaligambal Industries",           category: "Sand Supplier",                 email: "msudharsonraj@gmai.com",        phone: "8637431982", status: "active", website: "https://skifasteners.com/",           photo: null, created_at: "" },
  { id: 6,  name: "Mr. G M Muthu",            business: "GM Modular",                          category: "Interior Contractor",           email: "gmmmodular@gmail.com",          phone: "9840190449", status: "active", website: null,                                 photo: null, created_at: "" },
  { id: 7,  name: "Mr. A. Perumal",           business: "V for U Financial Services",          category: "Loans",                         email: "info@vforuloans.com",           phone: "9884323232", status: "active", website: "https://vforuloans.com/",            photo: null, created_at: "" },
  { id: 8,  name: "Mr. M. Ravi",              business: "TECH-O-MATE Solar Consultancy",       category: "Solar Power",                   email: "techomatesolar@gmail.com",      phone: "9094934000", status: "active", website: "https://www.techomate.com/",         photo: null, created_at: "" },
  { id: 9,  name: "Mr. R. Deenadhayalan",     business: "Classical Pest Control",              category: "Pest Control",                  email: "classicalpestcontrol@gmail.com",phone: "9150116447", status: "active", website: "https://classicalpestcontrol.com/",  photo: null, created_at: "" },
  { id: 10, name: "Mr. Sathish Ganasekar",    business: "Oli Av Tech",                         category: "Home Automation",               email: "sathish@oli-avtech.in",         phone: "9884180066", status: "active", website: "https://www.oli-avtech.in/",         photo: null, created_at: "" },
  { id: 11, name: "Mr. G. Subramani",         business: "SJ Windows",                          category: "UPVC Window",                   email: "info@sjupvcwindows.com",        phone: "9384869885", status: "active", website: "https://www.sjupvcwindows.com/",     photo: null, created_at: "" },
  { id: 12, name: "Mr. N. Sakthivel",         business: "Property Consultant",                 category: "Property Consultant",           email: "sakthirioo222@gmail.com",       phone: "9342234028", status: "active", website: null,                                 photo: null, created_at: "" },
  { id: 13, name: "Mr. R. Rajesh",            business: "SS Cool Power Systems",               category: "Home Appliances Dealer",        email: "sscoolpowersystems@gmail.com",  phone: "9600111070", status: "active", website: "https://sspowercool.com/",           photo: null, created_at: "" },
  { id: 14, name: "Mr. Vinoth Suren Raj",     business: "Fotophactory",                        category: "Photography & Videography",     email: "Vinothsurenraj@gmail.com",      phone: "9626220188", status: "active", website: "https://fotophactory.co.in/",        photo: null, created_at: "" },
  { id: 15, name: "Mr. V. M. Mathiarasu",     business: "Techmaxx Engineering",                category: "Fire Fighting",                 email: "techmaxengineering@gmail.com",  phone: "9940222426", status: "active", website: "https://techmaxxengg.com/",          photo: null, created_at: "" },
  { id: 16, name: "Mr. R. Ashokan",           business: "LED Star Light",                      category: "LED Lighting",                  email: null,                            phone: "9159828178", status: "active", website: null,                                 photo: null, created_at: "" },
  { id: 17, name: "Mr. R. Neelakandan",       business: "VRN Power Control System",            category: "Electrical Panel",              email: "neelakandan1985@rediffmail.com",phone: "9790905051", status: "active", website: null,                                 photo: null, created_at: "" },
  { id: 18, name: "Ms. D. Vijayalakshmi",     business: "Vida Brokerage Masters",              category: "Insurance",                     email: "dhana2411sekar@gmail.com",      phone: "9382535646", status: "active", website: null,                                 photo: null, created_at: "" },
  { id: 19, name: "Mr. Gokul Sridharan",      business: "unntangle",                           category: "IT & Home Automation",          email: "gokul@unntangle.com",           phone: "7092747933", status: "active", website: "https://unntangle.com/",             photo: null, created_at: "" },
  { id: 20, name: "Mr. Suresh Purushothaman", business: "Rakshan Decors",                      category: "Commercial Furniture",          email: "sales@onestopservices.info",    phone: "9500055772", status: "active", website: "https://rakshandecors.com/",         photo: null, created_at: "" },
  { id: 21, name: "Mr. Sathish Kumar I",      business: "ASK Unique Solutions",                category: "STP",                           email: "askupl@gmail.com",              phone: "9841145422", status: "active", website: null,                                 photo: null, created_at: "" },
  { id: 22, name: "Mr. B. Ravindran",         business: "DI Constructions",                    category: "Civil Contractor",              email: "djconstructions570@gmail.com",  phone: "6382776422", status: "active", website: null,                                 photo: null, created_at: "" },
];

export default async function MembersPage() {
  let members: MemberRow[] = STATIC_MEMBERS;

  try {
    const db = createServerClient();
    const { data } = await db
      .from("members")
      .select("*")
      .eq("status", "active")
      .order("id");

    // Only use Supabase data if it actually returned records
    if (data && data.length > 0) {
      // Merge: Supabase data takes priority, but fill gaps with static data
      members = STATIC_MEMBERS.map((staticMember) => {
        const live = data.find((d) => d.name === staticMember.name);
        return live ? { ...staticMember, ...live } : staticMember;
      });
    }
  } catch {
    // Supabase unavailable — use static data silently
  }

  return <MembersClient members={members} />;
}
