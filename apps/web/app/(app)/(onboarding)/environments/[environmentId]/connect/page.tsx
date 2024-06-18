import { ConnectWithFormbricks } from "@/app/(app)/(onboarding)/environments/[environmentId]/connect/components/ConnectWithFormbricks";
import { notFound } from "next/navigation";
import { WEBAPP_URL } from "@formbricks/lib/constants";
import { getEnvironment } from "@formbricks/lib/environment/service";
import { getCustomHeadline } from "@formbricks/lib/utils/strings";
import { TProductConfigChannel, TProductConfigIndustry } from "@formbricks/types/product";
import { Header } from "@formbricks/ui/Header";

interface ConnectPageProps {
  params: {
    environmentId: string;
  };
  searchParams: {
    channel?: TProductConfigChannel;
    industry?: TProductConfigIndustry;
  };
}

const Page = async ({ params, searchParams }: ConnectPageProps) => {
  const channel = searchParams.channel;
  const industry = searchParams.industry;
  const environment = await getEnvironment(params.environmentId);

  if (!channel || !industry || !environment) return notFound();
  const customHeadline = getCustomHeadline(channel, industry);

  return (
    <div className="flex min-h-full flex-col items-center justify-center py-10">
      <Header
        title={`Let's connect your ${customHeadline} with Formbricks`}
        subtitle="If you don't do it now, chances are low that you will ever do it!"
      />
      <div className="space-y-4 text-center">
        <p className="text-4xl font-medium text-slate-800"></p>
        <p className="text-sm text-slate-500"></p>
      </div>
      <ConnectWithFormbricks
        environment={environment}
        webAppUrl={WEBAPP_URL}
        widgetSetupCompleted={
          channel === "app" ? environment.appSetupCompleted : environment.websiteSetupCompleted
        }
        channel={channel}
        industry={industry}
      />
    </div>
  );
};

export default Page;
