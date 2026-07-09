import {
  Section,
  AssetSlot,
  Eyebrow,
  H1,
  H2,
  Lead,
} from "../components/CaseStudyModal";
import dashboard from "../assets/budgetBuoy/dashboard.mp4";
import dashboardTab from "../assets/budgetBuoy/dashboardTab.jpg";
import analysisTab from "../assets/budgetBuoy/analysisTab.jpg";
import signUp from "../assets/budgetBuoy/signUp.mp4";
import income from "../assets/budgetBuoy/income.mp4";
import expense from "../assets/budgetBuoy/expense.mp4";
import spendingChart from "../assets/budgetBuoy/spendingChart.mp4";

function PhoneFrame({
  src,
  isVideo,
  label,
}: {
  src?: string;
  isVideo?: boolean;
  label: string;
}) {
  return (
    <div className="flex flex-col gap-2">
      <div className="relative rounded-xl overflow-hidden aspect-9/16 border border-[rgba(255,255,255,0.08)] bg-bg-surface2">
        {src ? (
          isVideo ? (
            <video
              src={src}
              className="absolute inset-0 w-full h-full object-cover"
              autoPlay
              loop
              muted
              playsInline
            />
          ) : (
            <img
              src={src}
              alt={label}
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover"
            />
          )
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="font-(--font-mono) text-2xs tracking-wider uppercase text-text-tertiary text-center px-3 m-0">
              {label}
            </p>
          </div>
        )}
      </div>
      <p className="font-(--font-mono) text-2xs tracking-[0.08em] uppercase text-text-secondary m-0 text-center">
        {label}
      </p>
    </div>
  );
}

export default function BudgetBuoyCaseStudy() {
  return (
    <>
      {/* 01 Cover */}
      <Section>
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <Eyebrow>Case study</Eyebrow>
            <H1>Budget Buoy makes personal finance simple.</H1>
            <Lead>
              A mobile expense tracker designed to help users build better
              financial habits through quick transaction logging and easy to
              understand spending insights.
            </Lead>
            <div className="flex flex-col gap-3 mt-6">
              {[
                "Track income and expenses in seconds",
                "See your financial overview at a glance",
                "Understand spending trends over time",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-electric shrink-0" />
                  <p className="m-0 text-[15px] text-text-secondary">{item}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:justify-end grid-cols-2 gap-3 grid">
            <AssetSlot title="Dashboard" src={dashboardTab} variant="mobile" />
            <AssetSlot title="Analytics" src={analysisTab} variant="mobile" />
          </div>
        </div>
      </Section>

      {/* 02 Challenge */}
      <Section dark>
        <Eyebrow>The challenge</Eyebrow>
        <H2>Gaps I set out to close.</H2>
        <Lead>
          People want to understand where their money goes but struggle to
          consistently track it. Existing solutions feel overwhelming, making it
          difficult to build a habit of recording transactions and reviewing
          spending patterns.
        </Lead>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          {[
            {
              h: "Inconsistent tracking",
              p: "Recording expenses is easy to skip when it takes too many steps, leaving records incomplete.",
            },
            {
              h: "No real-time picture",
              p: "Bank apps show balances, not behaviour. Users can't see income vs. spend for the month they're in.",
            },
            {
              h: "Difficult to analyze",
              p: "Without clear visual summaries, it's hard to identify spending habits or make informed financial decisions.",
            },
          ].map(({ h, p }) => (
            <div key={h} className="border-t-2 border-electric pt-3">
              <h3 className="font-(--font-display) text-[17px] m-0 mb-1.5 text-text-primary">
                {h}
              </h3>
              <p className="m-0 text-[14px] text-text-secondary leading-relaxed">
                {p}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* 03 Stats */}
      <Section center>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            {
              n: "8",
              label: "Spending categories",
              body: "Organize transactions into intuitive categories for clearer spending insights and easier tracking.",
            },
            {
              n: "4",
              label: "Time views",
              body: "Daily, weekly, monthly, and yearly summaries to surface short term and long term spending patterns.",
            },
          ].map(({ n, label, body }) => (
            <div
              key={label}
              className="rounded-xl border border-border bg-bg-surface2 p-6 text-center"
            >
              <p
                className="font-(--font-display) text-electric leading-none tracking-[-0.04em] tabular-nums m-0"
                style={{ fontSize: "clamp(56px,9vw,88px)" }}
              >
                {n}
              </p>
              <h3 className="font-(--font-display) text-[16px] m-0 mt-2 mb-2 text-text-primary">
                {label}
              </h3>
              <p className="m-0 text-[13px] text-text-secondary leading-relaxed max-w-[40ch] text-pretty mx-auto">
                {body}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* 04 Core loop */}
      <Section>
        <Eyebrow>Core loop</Eyebrow>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 mt-6">
          {[
            {
              n: "01",
              h: "Authenticate",
              p: "Sign in securely to access and manage your personal finance data.",
            },
            {
              n: "02",
              h: "Log",
              p: "Quickly add income or expenses with an amount, category, and date.",
            },
            {
              n: "03",
              h: "Review",
              p: "Dashboard refreshes net, income, expenses, and recent activity.",
            },
            {
              n: "04",
              h: "Analyze",
              p: "See category breakdowns with time filters to reveal patterns using interactive charts.",
            },
          ].map(({ n, h, p }) => (
            <div key={n} className="border-t border-border pt-4">
              <p className="font-(--font-mono) text-[11px] text-electric tracking-wide m-0 mb-1.5">
                {n}
              </p>
              <h3 className="font-(--font-display) text-[17px] m-0 mb-1.5 text-text-primary">
                {h}
              </h3>
              <p className="m-0 text-md text-text-secondary leading-relaxed">
                {p}
              </p>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-8">
          <PhoneFrame label="Sign in" src={signUp} isVideo />
          <PhoneFrame label="Dashboard" src={dashboard} isVideo />
          <PhoneFrame label="Income" src={income} isVideo />
          <PhoneFrame label="Expense" src={expense} isVideo />
        </div>
      </Section>

      {/* 05 Analytics */}
      <Section dark>
        <Eyebrow>Analytics</Eyebrow>
        <H2>From transactions to spending insights.</H2>
        <Lead>
          Every transaction contributes to a clear dashboard that makes income, expenses, 
          and spending patterns easy to understand at a glance.
        </Lead>
        <AssetSlot
          title="Spending chart"
          src={spendingChart}
          variant="desktop"
          isVideo
        />
      </Section>

      {/* 06 What shipped */}
      <Section>
        <Eyebrow>What shipped</Eyebrow>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          {[
            {
              h: "Dashboard",
              p: "A personalized overview showing current balance, income, expenses, recent transactions, and summaries.",
            },
            {
              h: "Transaction Management",
              p: "Easily add, edit, and delete income and expense records while keeping financial data organized.",
            },
            {
              h: "Analytics",
              p: "Category breakdown charts, period selector, and expandable total-spending insight card.",
            },
          ].map(({ h, p }) => (
            <div key={h} className="border-t-2 border-electric pt-3">
              <h3 className="font-(--font-display) text-[17px] m-0 mb-1.5 text-text-primary">
                {h}
              </h3>
              <p className="m-0 text-[14px] text-text-secondary leading-relaxed">
                {p}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* 07 Architecture */}
      <Section dark>
        <Eyebrow>Architecture</Eyebrow>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-4 mt-6">
          {[
            {
              label: "Mobile",
              text: "Expo Router · React Native · TypeScript",
            },
            {
              label: "State",
              text: "Zustand auth store · AsyncStorage session",
            },
            { label: "API", text: "Express · JWT · REST" },
            {
              label: "Data",
              text: "MongoDB · paginated income / expense collections",
            },
          ].map(({ label, text }) => (
            <div
              key={label}
              className="border-l-2 border-[rgba(255,255,255,0.1)] pl-3.5"
            >
              <p className="font-(--font-mono) text-2xs tracking-[0.08em] uppercase text-text-secondary m-0 mb-1">
                {label}
              </p>
              <p className="m-0 text-[15px] text-text-primary">{text}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* 08 Takeaway */}
      <Section center>
        <Eyebrow>Takeaway</Eyebrow>
        <H1>Financial awareness starts with visibility.</H1>
        <Lead>
          Budget Buoy focuses on making everyday money management approachable through fast transaction tracking and meaningful visual insights. 
          Future improvements include recurring transactions, savings goals, budget planning, receipt uploads, and data export.
        </Lead>
      </Section>
    </>
  );
}
