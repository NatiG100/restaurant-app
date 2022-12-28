import Body from "../components/Body";
import StatGroup from "../components/stats/StatGroup";
import StatItem from "../components/stats/StatItem";

export default function Stats(){
  const stats = [
    {
      title:"Total Orders",
      value:2500,
    },
    {
      title:"Orders/day (Avg)",
      value:25,
    },
    {
      title:"Total Food Orders",
      value:2500,
    },
    {
      title:"Food Orders/day (Avg)",
      value:14,
    },
    {
      title:"Total Drink Orders",
      value:2500,
    },
    {
      title:"Drink Orders/day (Avg)",
      value:12,
    },
  ]
    return (
    <Body title="Stats">
      <div className="
        w-full p-6 pb-10 rounded-md shadow-sm h-max bg-white
        flex gap-10 flex-wrap
      ">
        <StatGroup
          title="Order"
          stats={stats}
        />
        <StatGroup
          title="Order"
          stats={stats}
        />
        <StatGroup
          title="Order"
          stats={stats}
        />
        <StatGroup
          title="Order"
          stats={stats}
        />
      </div>
    </Body>
    );
}