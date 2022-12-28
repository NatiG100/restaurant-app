import Body from "../components/Body";
import StatGroup from "../components/stats/StatGroup";
import StatItem from "../components/stats/StatItem";

export default function Stats(){
    return (
    <Body title="Stats">
      <StatGroup
        title="Order"
        stats={[
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
        ]}
      />
    </Body>
    );
}