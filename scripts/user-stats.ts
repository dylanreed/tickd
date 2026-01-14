// ABOUTME: CLI script to check total users and stats from Supabase.
// ABOUTME: Run with: npm run stats (requires scripts/.env with SUPABASE_SERVICE_ROLE_KEY)

import { config } from "dotenv";
import { createClient } from "@supabase/supabase-js";

// Load env from scripts/.env
config({ path: new URL(".env", import.meta.url).pathname });

const SUPABASE_URL = "https://ndflrqxqhfnudumastnu.supabase.co";
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SERVICE_ROLE_KEY) {
  console.error("Error: SUPABASE_SERVICE_ROLE_KEY environment variable required");
  console.error("Usage: SUPABASE_SERVICE_ROLE_KEY=xxx npm run stats");
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
  auth: { autoRefreshToken: false, persistSession: false },
});

interface Profile {
  id: string;
  email: string;
  subscription_status: string;
  created_at: string;
  trial_ends_at: string | null;
}

async function getStats() {
  const now = new Date();
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

  // Fetch all profiles
  const { data: profiles, error } = await supabase
    .from("profiles")
    .select("id, email, subscription_status, created_at, trial_ends_at")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching profiles:", error.message);
    process.exit(1);
  }

  const users = profiles as Profile[];
  const total = users.length;

  // Subscription breakdown
  const byStatus: Record<string, number> = {};
  for (const user of users) {
    const status = user.subscription_status || "unknown";
    byStatus[status] = (byStatus[status] || 0) + 1;
  }

  // Signups over time
  const signupsToday = users.filter(
    (u) => new Date(u.created_at) >= todayStart
  ).length;
  const signupsThisWeek = users.filter(
    (u) => new Date(u.created_at) >= weekAgo
  ).length;
  const signupsThisMonth = users.filter(
    (u) => new Date(u.created_at) >= monthAgo
  ).length;

  // Trials expiring soon (within 3 days)
  const threeDaysFromNow = new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000);
  const trialsExpiringSoon = users.filter((u) => {
    if (!u.trial_ends_at || u.subscription_status !== "trialing") return false;
    const trialEnd = new Date(u.trial_ends_at);
    return trialEnd >= now && trialEnd <= threeDaysFromNow;
  }).length;

  // Expired trials (trial ended but not converted)
  const expiredTrials = users.filter((u) => {
    if (!u.trial_ends_at) return false;
    return (
      u.subscription_status === "trialing" && new Date(u.trial_ends_at) < now
    );
  }).length;

  // Fetch task stats
  const { count: totalTasks } = await supabase
    .from("tasks")
    .select("*", { count: "exact", head: true });

  const { count: completedTasks } = await supabase
    .from("tasks")
    .select("*", { count: "exact", head: true })
    .eq("status", "completed");

  // Print report
  console.log("\n" + "=".repeat(50));
  console.log("  TICKD USER STATS - " + now.toLocaleDateString());
  console.log("=".repeat(50));

  console.log("\n📊 TOTAL USERS:", total);

  console.log("\n📈 SIGNUPS:");
  console.log(`   Today:      ${signupsToday}`);
  console.log(`   This week:  ${signupsThisWeek}`);
  console.log(`   This month: ${signupsThisMonth}`);

  console.log("\n💳 SUBSCRIPTION STATUS:");
  for (const [status, count] of Object.entries(byStatus).sort(
    (a, b) => b[1] - a[1]
  )) {
    const pct = ((count / total) * 100).toFixed(1);
    console.log(`   ${status.padEnd(12)} ${count.toString().padStart(4)} (${pct}%)`);
  }

  console.log("\n⏰ TRIALS:");
  console.log(`   Expiring in 3 days: ${trialsExpiringSoon}`);
  console.log(`   Expired (not converted): ${expiredTrials}`);

  console.log("\n✅ TASKS:");
  console.log(`   Total:     ${totalTasks || 0}`);
  console.log(`   Completed: ${completedTasks || 0}`);
  if (totalTasks && totalTasks > 0) {
    const completionRate = (((completedTasks || 0) / totalTasks) * 100).toFixed(1);
    console.log(`   Completion rate: ${completionRate}%`);
  }

  // Show recent signups
  if (signupsToday > 0) {
    console.log("\n🆕 TODAY'S SIGNUPS:");
    const todaysUsers = users.filter((u) => new Date(u.created_at) >= todayStart);
    for (const user of todaysUsers.slice(0, 10)) {
      console.log(`   ${user.email}`);
    }
    if (todaysUsers.length > 10) {
      console.log(`   ... and ${todaysUsers.length - 10} more`);
    }
  }

  console.log("\n" + "=".repeat(50) + "\n");
}

getStats().catch(console.error);
