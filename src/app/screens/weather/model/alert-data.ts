export interface Alerts {
  alert: Alert[];
}
export interface Alert {
  headline: string;
  msgtype: string | null;
  severity: string | null;
  urgency: string | null;
  areas: string | null;
  category: string;
  certainty: string | null;
  event: string;
  note: string | null;
  effective: string;
  expires: string;
  desc: string;
  instruction: string;
}
