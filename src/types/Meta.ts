/**
 * Generic meta data used to ensure consistency across the application.
 */
export default interface Meta {
  author: string;
  created: string | Date;
  updated: string | Date;
  lastActive: string | Date;
  createdBy: string | null;
  updatedBy: string | null;
}
