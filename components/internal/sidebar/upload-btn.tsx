"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { UploadDropzone } from "@/utils/uploadthing";
import { CheckCircle2, Info, PlusCircle } from "lucide-react";
import { twMerge } from "tailwind-merge";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { toast } from "sonner";
import { transcribe } from "@/actions/transcribe.action";
import { summarize } from "@/actions/summarize.action";

export default function UploadButton() {
  return (
    <button
      onClick={async () =>
        await summarize(
          "I'll start again. Thank you very much. This is the RMS Springfield meeting agenda for April the eighth of twenty twenty five, a committee of a whole starting at exactly 1PM. I'd like to do the introductions. Myself, I'm mayor Patrick Tarrion, and to my right in descending order is deputy mayor Glenn Fuel, ward one. Ward two is Andy Kaczynski. And next will be Ward 3, Mark Miller. Next would be Ward 4, excuse me, Melinda Warren. And I wonder if we'll go to the approval of the agenda. Is there any amendments or deletions to that from council? And I see none. And then I get a show of hands of those in support. Unanimous. It's carried. And we'll go to approval of the minutes. That's a committee of the whole minutes from the last time. That'll be on March. Any additions, deletions to the minutes at all? And I see none. Can I just get a show of hands to those in support? Yeah. Send us current. Then we'll go to and finish our business. First one will be a 6.1. That's the use of, firearms, bylaw, the draft use. Any discussions on that at all? So this came to counsel at a previous committee of the whole. There was just a few suggestions on this. So we've brought back some changes. They've been tracked in the bylaws so counsel can see what's changed. There was a request to define center fire rifle ammo, so that has been included there. Other changes, we talked about the shooting range and shooting gallery. So there's a slight change that says does not include shooting gallery was removed, because that is proposed within the new, zoning bylaw. So we've removed that. We've just removed high powered because now we're just talking about center fire rifle. So there's a few places where high powered rifle is removed, and then just some sections of the numbering had to be updated. So you'll see some numbering change and then a slight change to add, and the discharge of a firearm is not occurring in game areas 34 a or 38, so that was added in. There was also discussion on the very last page about fine amounts that they may be were too low. So we did look at comparables and have suggested some increases to those fine amounts. So that's the bulk of the the changes that we went with after initial discussions with council. Thank you. Any discussions, from council with regards, to, the amendments from our last March 11? I see none. Do we still do the show of support and all that? No. So we will bring this back to a future council meeting for council to give first reading. And then if there's any other changes we want, we can initiate those. Okay. Then we'll go to six point two, that's Insightly Bylaw. Same process with this. This was brought to council at a previous committee of the whole meeting. Not a ton of changes on this one. There was a comment made on page, I guess, six of the document where it talked about regular outdoor burning, the smoke of which causes a nuisance to adjoining properties. Because we have that addressed in our fire bylaws, we just decided to take this out instead of trying to explain what regular outdoor burning would mean because it's quite detailed in our fire bylaws. So we just felt that it was easier to take it out of this bylaw altogether. And then the second document is the offense schedule, and I know there were some comments on whether these were appropriate fine amounts. I think specifically with the unsightly bylaw, we try to get people to work with us, so the point is not to find people. We always wanna kinda get them to work with us willingly to correct the change. So, we were satisfied with the fine amounts for this bylaw. Thank you. Any questions from council at all? I think that's well done. Then we'll go nothing else on the agenda except for item seven, the closed meeting. If I get a mover and second, we'll go into a closed meeting, Glenn and Patrick. Then we'll go into closed meeting at exactly 01:05PM. Everybody puts it on. Thank you. Gonna come out of a closed meeting at 01:38. Can I get a mover and a second or come out of a closed meeting, Glenn and Patrick? And we discussed the legal matters, court of conduct there, and we're prepared to adjourn at 01:38PM. Thank you."
        )
      }>
      Summarize
    </button>
    // <Dialog>
    //   <DialogTrigger asChild>
    //     <Button className="w-full hover:cursor-pointer">
    //       <PlusCircle />
    //       <span>Upload meeting</span>
    //     </Button>
    //   </DialogTrigger>
    //   <DialogContent>
    //     <VisuallyHidden>
    //       {/* TODO: Update text */}
    //       <DialogTitle>Upload file</DialogTitle>
    //       <DialogDescription>Upload your files here</DialogDescription>
    //     </VisuallyHidden>
    //     <UploadDropzone
    //       endpoint="audioUploader"
    //       config={{ cn: twMerge }}
    //       appearance={{
    //         label: "text-base text-primary",
    //         allowedContent: "text-sm text-muted-foreground",
    //         button:
    //           "ut-ready:bg-primary ut-ready:text-background ut-ready:font-medium ut-ready:text-sm ut-readying:bg-primary ut-readying:text-sm ut-readying:text-background ut-uploading:bg-green-500",
    //       }}
    //       onClientUploadComplete={async (res) => {
    //         const { transcript, uploadId } = res[0].serverData;

    //         console.log(transcript);

    //         toast.success("Uploaded successfully!", {
    //           description: `Your file is safely stored in our trusted servers`,
    //           icon: <CheckCircle2 className="w-4 h-4 stroke-green-300" />,
    //         });

    //         toast.info("Starting summarization and extraction process", {
    //           icon: <Info className="w-4 h-4" />,
    //         });

    //         await summarize(
    //           "I'll start again. Thank you very much. This is the RMS Springfield meeting agenda for April the eighth of twenty twenty five, a committee of a whole starting at exactly 1PM. I'd like to do the introductions. Myself, I'm mayor Patrick Tarrion, and to my right in descending order is deputy mayor Glenn Fuel, ward one. Ward two is Andy Kaczynski. And next will be Ward 3, Mark Miller. Next would be Ward 4, excuse me, Melinda Warren. And I wonder if we'll go to the approval of the agenda. Is there any amendments or deletions to that from council? And I see none. And then I get a show of hands of those in support. Unanimous. It's carried. And we'll go to approval of the minutes. That's a committee of the whole minutes from the last time. That'll be on March. Any additions, deletions to the minutes at all? And I see none. Can I just get a show of hands to those in support? Yeah. Send us current. Then we'll go to and finish our business. First one will be a 6.1. That's the use of, firearms, bylaw, the draft use. Any discussions on that at all? So this came to counsel at a previous committee of the whole. There was just a few suggestions on this. So we've brought back some changes. They've been tracked in the bylaws so counsel can see what's changed. There was a request to define center fire rifle ammo, so that has been included there. Other changes, we talked about the shooting range and shooting gallery. So there's a slight change that says does not include shooting gallery was removed, because that is proposed within the new, zoning bylaw. So we've removed that. We've just removed high powered because now we're just talking about center fire rifle. So there's a few places where high powered rifle is removed, and then just some sections of the numbering had to be updated. So you'll see some numbering change and then a slight change to add, and the discharge of a firearm is not occurring in game areas 34 a or 38, so that was added in. There was also discussion on the very last page about fine amounts that they may be were too low. So we did look at comparables and have suggested some increases to those fine amounts. So that's the bulk of the the changes that we went with after initial discussions with council. Thank you. Any discussions, from council with regards, to, the amendments from our last March 11? I see none. Do we still do the show of support and all that? No. So we will bring this back to a future council meeting for council to give first reading. And then if there's any other changes we want, we can initiate those. Okay. Then we'll go to six point two, that's Insightly Bylaw. Same process with this. This was brought to council at a previous committee of the whole meeting. Not a ton of changes on this one. There was a comment made on page, I guess, six of the document where it talked about regular outdoor burning, the smoke of which causes a nuisance to adjoining properties. Because we have that addressed in our fire bylaws, we just decided to take this out instead of trying to explain what regular outdoor burning would mean because it's quite detailed in our fire bylaws. So we just felt that it was easier to take it out of this bylaw altogether. And then the second document is the offense schedule, and I know there were some comments on whether these were appropriate fine amounts. I think specifically with the unsightly bylaw, we try to get people to work with us, so the point is not to find people. We always wanna kinda get them to work with us willingly to correct the change. So, we were satisfied with the fine amounts for this bylaw. Thank you. Any questions from council at all? I think that's well done. Then we'll go nothing else on the agenda except for item seven, the closed meeting. If I get a mover and second, we'll go into a closed meeting, Glenn and Patrick. Then we'll go into closed meeting at exactly 01:05PM. Everybody puts it on. Thank you. Gonna come out of a closed meeting at 01:38. Can I get a mover and a second or come out of a closed meeting, Glenn and Patrick? And we discussed the legal matters, court of conduct there, and we're prepared to adjourn at 01:38PM. Thank you."
    //         );

    //         // TODO:
    //         //  show in meetings as "transcribing"
    //       }}
    //       onUploadError={(error: Error) => {
    //         console.error(error.message);
    //       }}
    //     />
    //   </DialogContent>
    // </Dialog>
  );
}
