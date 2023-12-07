import { UserSchema } from "./User.schema";
import { UserXTokenSchema } from "./UserXToken.schema";

export const combinedSchema = {
    User: UserSchema,
    UserXToken: UserXTokenSchema
};

export default combinedSchema;