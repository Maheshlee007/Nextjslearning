-- AddForeignKey
ALTER TABLE "public"."user_details" ADD CONSTRAINT "user_details_userid_fkey" FOREIGN KEY ("userid") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
