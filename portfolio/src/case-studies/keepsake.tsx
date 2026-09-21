import {
  Section,
  AssetSlot,
  Eyebrow,
  H1,
  H2,
  Lead,
} from "../components/CaseStudyModal";

import dash from "../assets/keepsake/dash.png";

export default function KeepsakeCaseStudy() {
  return (
    <>
      {/* 01 Cover */}
      <Section>
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <Eyebrow>Case study</Eyebrow>
            <H1>Keepsake, a widget to display your favourite memories.</H1>
            <Lead>
              Pick your photos, drop the widget, and enjoy the nostalgic moments
              from your home screen.
            </Lead>
            <div className="flex flex-col gap-3 mt-6">
              {[
                "Pick photos and drop the widget on any launcher",
                "Rotates automatically on a battery-aware schedule",
                "Manual prev / next and tap-to-view full screen",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-electric shrink-0" />
                  <p className="m-0 text-[15px] text-text-secondary">{item}</p>
                </div>
              ))}
            </div>
          </div>

          <AssetSlot
            title="Keepsake"
            hint="Home screen widget"
            variant="mobile"
            src={dash}
          />
        </div>
      </Section>

      {/* 02 Inspiration */}
      <Section>
        <div className="max-w-3xl">
          <Eyebrow>The inspiration</Eyebrow>
          <Lead>
            Keepsake started with a discussion with a friend. She liked having
            photos on her home screen, but her phone's default photo widget gave
            her little control over them. She couldn't swipe between pictures,
            and the automatic rotation wasn't always reliable.
          </Lead>
          <Lead>
            The idea was simple: a photo widget that rotates through your
            memories automatically, but also allows you to flip through them
            manually.
          </Lead>
        </div>
      </Section>

      {/* 03 Challenge */}
      <Section dark>
        <Eyebrow>The challenge</Eyebrow>
        <H2>Widgets are a different platform.</H2>
        <Lead>
          Android home-screen widgets don't run in the same rendering world as
          the rest of the app.
        </Lead>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          {[
            {
              h: "Limited rendering surface",
              p: "Widgets can't use arbitrary Compose views or clipping, so custom shapes need to be handled manually.",
            },
            {
              h: "Reliable photo rotation",
              p: "Android limits exact background scheduling to protect battery life, so I had to design the rotation system to stay reliable even when updates couldn't happen at an exact time.",
            },
            {
              h: "Keeping the app and widget in sync",
              p: "The widget runs separately from the main app, so I needed a reliable way to keep photo selections, settings, and the currently displayed image synchronized.",
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

      {/* 04 How I tackled it */}
      <Section>
        <Eyebrow>How I tackled it</Eyebrow>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          {[
            {
              h: "Working within widget rendering limits",
              p: "I used Jetpack Glance to build the widget declaratively, then handled unsupported visual features like custom image shapes and clipping manually through bitmap masking.",
            },
            {
              h: "Making rotation reliable",
              p: "The scheduler rotates photos every 10 seconds using exact alarms where Android allows them, falling back to inexact alarms plus a WorkManager backup job when it doesn't.",
            },
            {
              h: "Optimizing images for widgets",
              p: "I built a lightweight image pipeline that corrects EXIF orientation, downsamples large photos before loading them, and avoids unnecessary memory usage at widget scale.",
            },
            {
              h: "Keeping the app and widget synchronized",
              p: "SharedPreferences shares photo selections and settings between the app and widget processes, while Glance manages per-widget state such as the currently displayed photo.",
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

      {/* 05 Architecture */}
      <Section dark>
        <Eyebrow>Architecture</Eyebrow>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-4 mt-6">
          {[
            { label: "Language", text: "Kotlin" },
            {
              label: "UI",
              text: "Jetpack Compose · Glance Widgets · Material 3",
            },
            { label: "Scheduling", text: "AlarmManager · WorkManager" },
            { label: "Imaging", text: "Coil · manual EXIF & bitmap masking" },
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
    </>
  );
}
