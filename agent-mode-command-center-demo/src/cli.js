import { releaseSignals } from "./signals.js";
import { formatCouncilBrief } from "./readiness.js";

const brief = formatCouncilBrief(releaseSignals);

console.log(`Release: ${brief.release}`);
console.log(`Service: ${brief.service}`);
console.log(`Region: ${brief.region}`);
console.log(`Decision: ${brief.decision}`);
console.log(`Readiness: ${brief.readiness}%`);
console.log(`Reason: ${brief.reason}`);

if (brief.blockers.length > 0) {
  console.log("Blockers:");
  brief.blockers.forEach((blocker) => console.log(`- ${blocker}`));
}

if (brief.warnings.length > 0) {
  console.log("Warnings:");
  brief.warnings.forEach((warning) => console.log(`- ${warning}`));
}
