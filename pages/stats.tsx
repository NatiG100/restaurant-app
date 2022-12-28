import Body from "../components/Body";
import StatItem from "../components/stats/StatItem";

export default function Stats(){
    return (
    <Body title="Stats">
      <StatItem
        title="Orders"
        value={200010.124}
        multiplier="K"
        postfix="Birr"
        fixTo={2}
      />
    </Body>
    );
}