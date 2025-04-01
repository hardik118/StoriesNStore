import z from "zod";

export const userSingupInput= z.object({
    email: z.string().email(),
    password: z.string().min(6),
    username: z.string().max(25).optional()

})
export const userSigninInput= z.object({
    email: z.string().email(),
    password: z.string().min(6),

});
export const userBlogInput= z.object({
    title: z.string(),
    content: z.string(),
})
export const userBlogUpdateInput=z.object({
    title: z.string(),
    content: z.string(),
    id: z.string(),
    name: z.string()
})
export type UpdateBlogInput=z.infer<typeof userBlogUpdateInput>
export type BlogInput= z.infer<typeof userBlogInput>
export  type SigninInput=z.infer<typeof userSigninInput>
export type  SignupInput= z.infer<typeof userSingupInput>;
