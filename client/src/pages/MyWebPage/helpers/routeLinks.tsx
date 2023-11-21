import { paths } from "constants/routes";
import { CiGift, CiTrophy, CiVault } from "react-icons/ci";

export const routeLinks = [
    {
        icon: <CiTrophy />,
        onclick: () => window.open(
            "https://agent.comfortfinancialsolutions.com/signup"
        ),
        text: 'Be a CFS Agent'
    },
    {
        icon: <CiGift />,
        onclick: () => window.open(paths.subscriberRegistration),
        text: 'Earn Points as a CFS Subscriber'
    },
    {
        icon: <CiVault />,
        onclick: () => window.open(paths.portalRegistration),
        text: 'Try CFS for 30-days'
    },
    /* <Button>
                        <div className="icon-holder">
                          <CiMonitor />
                        </div>
                        Join our webinar <br /> to learn more
                      </Button> Doesn't have a function yet, get from marketing.*/
]