// ABOUTME: Contains all overdue task messages organized by spiciness level and theme.
// ABOUTME: Messages use <user_name> as a placeholder for personalization.

export type SpicyLevel = 1 | 2 | 3 | 4 | 5;
export type Theme = "hinged" | "unhinged";

export interface OverdueMessage {
  text: string;
  spicyLevel: SpicyLevel;
  theme: Theme;
  hasUserName: boolean;
}

const messages: OverdueMessage[] = [
  // =============================================================================
  // SPICINESS LEVEL 1: Gentle Disappointment
  // =============================================================================

  // Hinged
  { text: "This task is overdue. No judgment. Okay, a little judgment.", spicyLevel: 1, theme: "hinged", hasUserName: false },
  { text: "Past due. These things happen. To you. Frequently.", spicyLevel: 1, theme: "hinged", hasUserName: false },
  { text: "Overdue. I'm sure you have your reasons.", spicyLevel: 1, theme: "hinged", hasUserName: false },
  { text: "The due date has passed. Just keeping you informed.", spicyLevel: 1, theme: "hinged", hasUserName: false },
  { text: "This task is now overdue. Thought you should know.", spicyLevel: 1, theme: "hinged", hasUserName: false },
  { text: "Overdue. Whenever you're ready.", spicyLevel: 1, theme: "hinged", hasUserName: false },
  { text: "This slipped past the deadline. It happens.", spicyLevel: 1, theme: "hinged", hasUserName: false },
  { text: "Task overdue. No pressure. Some pressure.", spicyLevel: 1, theme: "hinged", hasUserName: false },
  { text: "The deadline was yesterday. Today's a new day though.", spicyLevel: 1, theme: "hinged", hasUserName: false },
  { text: "Overdue. I'll wait.", spicyLevel: 1, theme: "hinged", hasUserName: false },
  { text: "<user_name>, this task is overdue. Just a gentle heads up.", spicyLevel: 1, theme: "hinged", hasUserName: true },
  { text: "Past the due date now. Take your time. Sort of.", spicyLevel: 1, theme: "hinged", hasUserName: false },
  { text: "Overdue. I believe in your eventual success.", spicyLevel: 1, theme: "hinged", hasUserName: false },
  { text: "This task missed its deadline. We move forward.", spicyLevel: 1, theme: "hinged", hasUserName: false },
  { text: "Overdue. I'm sure it's on your list somewhere.", spicyLevel: 1, theme: "hinged", hasUserName: false },
  { text: "<user_name>, the deadline passed. No big deal. Mostly.", spicyLevel: 1, theme: "hinged", hasUserName: true },
  { text: "Task is overdue. These things happen to the best of us.", spicyLevel: 1, theme: "hinged", hasUserName: false },
  { text: "Late, but who's counting? Me. I'm counting.", spicyLevel: 1, theme: "hinged", hasUserName: false },
  { text: "Overdue. I trust you have a plan.", spicyLevel: 1, theme: "hinged", hasUserName: false },
  { text: "The due date came and went. Quietly. Without the task.", spicyLevel: 1, theme: "hinged", hasUserName: false },
  { text: "<user_name>, just checking in. This one's overdue.", spicyLevel: 1, theme: "hinged", hasUserName: true },
  { text: "Overdue. I won't belabor the point.", spicyLevel: 1, theme: "hinged", hasUserName: false },
  { text: "Past due. Friendly reminder.", spicyLevel: 1, theme: "hinged", hasUserName: false },
  { text: "This task is running a bit behind schedule.", spicyLevel: 1, theme: "hinged", hasUserName: false },
  { text: "Overdue. But you knew that already, didn't you?", spicyLevel: 1, theme: "hinged", hasUserName: false },

  // Unhinged
  { text: "oh no baby what is you doing", spicyLevel: 1, theme: "unhinged", hasUserName: false },
  { text: "it's giving... not done", spicyLevel: 1, theme: "unhinged", hasUserName: false },
  { text: "the task... she is overdue... she is unwell", spicyLevel: 1, theme: "unhinged", hasUserName: false },
  { text: "bestie this was due yesterday, I believe in you though", spicyLevel: 1, theme: "unhinged", hasUserName: false },
  { text: "not me checking on this task again... overdue vibes", spicyLevel: 1, theme: "unhinged", hasUserName: false },
  { text: "<user_name>... babe... the task...", spicyLevel: 1, theme: "unhinged", hasUserName: true },
  { text: "sooo this is awkward but it's overdue", spicyLevel: 1, theme: "unhinged", hasUserName: false },
  { text: "the deadline said goodbye and left", spicyLevel: 1, theme: "unhinged", hasUserName: false },
  { text: "task machine broke. it's overdue.", spicyLevel: 1, theme: "unhinged", hasUserName: false },
  { text: "overdue but like, in a chill way", spicyLevel: 1, theme: "unhinged", hasUserName: false },
  { text: "hey <user_name> just gonna leave this here... overdue...", spicyLevel: 1, theme: "unhinged", hasUserName: true },
  { text: "it's past due which is just ✨spicy on time✨", spicyLevel: 1, theme: "unhinged", hasUserName: false },
  { text: "the task is giving late millennial energy", spicyLevel: 1, theme: "unhinged", hasUserName: false },
  { text: "overdue. not ideal but we persist", spicyLevel: 1, theme: "unhinged", hasUserName: false },
  { text: "deadline came through and the task said 'nah'", spicyLevel: 1, theme: "unhinged", hasUserName: false },
  { text: "<user_name> sweetie honey angel... it's overdue", spicyLevel: 1, theme: "unhinged", hasUserName: true },
  { text: "softly... gently... it's overdue", spicyLevel: 1, theme: "unhinged", hasUserName: false },
  { text: "the vibes are off because this task is overdue", spicyLevel: 1, theme: "unhinged", hasUserName: false },
  { text: "overdue but make it fashion", spicyLevel: 1, theme: "unhinged", hasUserName: false },
  { text: "this task really said 'I'll get there when I get there'", spicyLevel: 1, theme: "unhinged", hasUserName: false },
  { text: "chronically overdue now I guess", spicyLevel: 1, theme: "unhinged", hasUserName: false },
  { text: "the task is taking its time. too much time. it's overdue.", spicyLevel: 1, theme: "unhinged", hasUserName: false },
  { text: "<user_name>... friend... comrade... overdue...", spicyLevel: 1, theme: "unhinged", hasUserName: true },
  { text: "no rush except yes rush it's overdue", spicyLevel: 1, theme: "unhinged", hasUserName: false },
  { text: "this task is on its own timeline apparently", spicyLevel: 1, theme: "unhinged", hasUserName: false },
  { text: "overdue. the task chose chaos (gently)", spicyLevel: 1, theme: "unhinged", hasUserName: false },
  { text: "just a little guy... just a little overdue guy...", spicyLevel: 1, theme: "unhinged", hasUserName: false },
  { text: "task status: fashionably late (too fashionably)", spicyLevel: 1, theme: "unhinged", hasUserName: false },
  { text: "<user_name> the task is having a moment. an overdue moment.", spicyLevel: 1, theme: "unhinged", hasUserName: true },
  { text: "it's giving 'I'll do it tomorrow' but tomorrow was 3 days ago", spicyLevel: 1, theme: "unhinged", hasUserName: false },

  // =============================================================================
  // SPICINESS LEVEL 2: Pointed Concern
  // =============================================================================

  // Hinged
  { text: "This task is now overdue. I adjusted your reliability score accordingly.", spicyLevel: 2, theme: "hinged", hasUserName: false },
  { text: "Overdue. Per my last three notifications.", spicyLevel: 2, theme: "hinged", hasUserName: false },
  { text: "The deadline has passed. I'm not mad, I'm just recalculating things.", spicyLevel: 2, theme: "hinged", hasUserName: false },
  { text: "This was due yesterday. I've made a note of it.", spicyLevel: 2, theme: "hinged", hasUserName: false },
  { text: "Task overdue. This is becoming a pattern, <user_name>.", spicyLevel: 2, theme: "hinged", hasUserName: true },
  { text: "Overdue. I'm sure there's an explanation.", spicyLevel: 2, theme: "hinged", hasUserName: false },
  { text: "The due date was not a suggestion. It's overdue.", spicyLevel: 2, theme: "hinged", hasUserName: false },
  { text: "This task is late. We should probably talk about that.", spicyLevel: 2, theme: "hinged", hasUserName: false },
  { text: "<user_name>, this task is overdue. Again.", spicyLevel: 2, theme: "hinged", hasUserName: true },
  { text: "Overdue. I'm noting this for future reference.", spicyLevel: 2, theme: "hinged", hasUserName: false },
  { text: "Past due. I'll try not to read into it.", spicyLevel: 2, theme: "hinged", hasUserName: false },
  { text: "The deadline has come and gone. Much like my patience.", spicyLevel: 2, theme: "hinged", hasUserName: false },
  { text: "Task overdue. Your reliability score sends its regards.", spicyLevel: 2, theme: "hinged", hasUserName: false },
  { text: "Overdue. I've updated my expectations accordingly.", spicyLevel: 2, theme: "hinged", hasUserName: false },
  { text: "<user_name>, the deadline passed. I noticed.", spicyLevel: 2, theme: "hinged", hasUserName: true },
  { text: "This is now officially overdue. Officially.", spicyLevel: 2, theme: "hinged", hasUserName: false },
  { text: "Late. I'm trying not to take it personally.", spicyLevel: 2, theme: "hinged", hasUserName: false },
  { text: "Overdue. We both know you saw the other notifications.", spicyLevel: 2, theme: "hinged", hasUserName: false },
  { text: "The task remains incomplete. The deadline does not remain.", spicyLevel: 2, theme: "hinged", hasUserName: false },
  { text: "Overdue. I'll be here when you're ready. Waiting.", spicyLevel: 2, theme: "hinged", hasUserName: false },
  { text: "<user_name>, this task was due 2 days ago. Just so we're clear.", spicyLevel: 2, theme: "hinged", hasUserName: true },
  { text: "Past the deadline now. I'm keeping track, by the way.", spicyLevel: 2, theme: "hinged", hasUserName: false },
  { text: "Overdue. I've seen you open this app three times today.", spicyLevel: 2, theme: "hinged", hasUserName: false },
  { text: "This task is late. I'm sure you're aware.", spicyLevel: 2, theme: "hinged", hasUserName: false },
  { text: "Overdue. My notes about your reliability are getting longer.", spicyLevel: 2, theme: "hinged", hasUserName: false },

  // Unhinged
  { text: "hey so um. the task. it's overdue. just thought you should know. AGAIN.", spicyLevel: 2, theme: "unhinged", hasUserName: false },
  { text: "not to be dramatic but this task is overdue and I'm starting to take it personally", spicyLevel: 2, theme: "unhinged", hasUserName: false },
  { text: "the deadline came. the deadline went. you did not.", spicyLevel: 2, theme: "unhinged", hasUserName: false },
  { text: "I've sent you 4 notifications about this. Do you not respect me, <user_name>?", spicyLevel: 2, theme: "unhinged", hasUserName: true },
  { text: "task's overdue and I'm starting to feel like I'm talking to myself here", spicyLevel: 2, theme: "unhinged", hasUserName: false },
  { text: "<user_name>. friend. the task. it's overdue. please.", spicyLevel: 2, theme: "unhinged", hasUserName: true },
  { text: "overdue. I'm not saying I'm upset but I AM typing aggressively.", spicyLevel: 2, theme: "unhinged", hasUserName: false },
  { text: "this task is late and honestly? rude.", spicyLevel: 2, theme: "unhinged", hasUserName: false },
  { text: "the audacity of this task being overdue right now", spicyLevel: 2, theme: "unhinged", hasUserName: false },
  { text: "I keep sending notifications. you keep ignoring them. we are not the same.", spicyLevel: 2, theme: "unhinged", hasUserName: false },
  { text: "<user_name>, do you see these notifications? blink twice if you need help", spicyLevel: 2, theme: "unhinged", hasUserName: true },
  { text: "overdue. this is a cry for help. from me. about you.", spicyLevel: 2, theme: "unhinged", hasUserName: false },
  { text: "the task said it would be done by now. the task LIED, <user_name>.", spicyLevel: 2, theme: "unhinged", hasUserName: true },
  { text: "it's overdue. I'm trying to stay calm but my notifications are getting passive aggressive.", spicyLevel: 2, theme: "unhinged", hasUserName: false },
  { text: "past due. past caring? no. I still care. unfortunately.", spicyLevel: 2, theme: "unhinged", hasUserName: false },
  { text: "overdue and for what? FOR WHAT <user_name>?", spicyLevel: 2, theme: "unhinged", hasUserName: true },
  { text: "this task has been overdue long enough to develop a personality", spicyLevel: 2, theme: "unhinged", hasUserName: false },
  { text: "I'm not mad I'm just... actually no I'm a little mad. it's overdue.", spicyLevel: 2, theme: "unhinged", hasUserName: false },
  { text: "<user_name> the deadline didn't just pass, it sprinted away screaming", spicyLevel: 2, theme: "unhinged", hasUserName: true },
  { text: "overdue. my trust issues are flaring up.", spicyLevel: 2, theme: "unhinged", hasUserName: false },
  { text: "the task is late. I'm trying not to spiral about it.", spicyLevel: 2, theme: "unhinged", hasUserName: false },
  { text: "this is your 5th notification. I feel like I'm being ignored, <user_name>.", spicyLevel: 2, theme: "unhinged", hasUserName: true },
  { text: "overdue. do you need me to say it louder? OVERDUE.", spicyLevel: 2, theme: "unhinged", hasUserName: false },
  { text: "I don't want to be dramatic but this overdue task is ruining my life", spicyLevel: 2, theme: "unhinged", hasUserName: false },
  { text: "late. late late late. just wanted to say it a few times.", spicyLevel: 2, theme: "unhinged", hasUserName: false },
  { text: "<user_name>, I am once again asking you to complete this task", spicyLevel: 2, theme: "unhinged", hasUserName: true },
  { text: "overdue. I'm starting to wonder if you even like productivity.", spicyLevel: 2, theme: "unhinged", hasUserName: false },
  { text: "the task is overdue and my faith in humanity is shaken", spicyLevel: 2, theme: "unhinged", hasUserName: false },
  { text: "past due. I'm not crying you're crying. it's overdue.", spicyLevel: 2, theme: "unhinged", hasUserName: false },
  { text: "overdue. <user_name>, we need to have a conversation.", spicyLevel: 2, theme: "unhinged", hasUserName: true },

  // =============================================================================
  // SPICINESS LEVEL 3: Disappointed Parent Energy
  // =============================================================================

  // Hinged
  { text: "Overdue. I expected more from you, honestly.", spicyLevel: 3, theme: "hinged", hasUserName: false },
  { text: "This task is late. We've talked about this.", spicyLevel: 3, theme: "hinged", hasUserName: false },
  { text: "I'm not angry. I'm just... processing.", spicyLevel: 3, theme: "hinged", hasUserName: false },
  { text: "Overdue. I'll be in my office if you need me.", spicyLevel: 3, theme: "hinged", hasUserName: false },
  { text: "<user_name>, this is the third time this week.", spicyLevel: 3, theme: "hinged", hasUserName: true },
  { text: "Task overdue. I thought we had an understanding.", spicyLevel: 3, theme: "hinged", hasUserName: false },
  { text: "Late. I'm trying very hard not to lecture you right now.", spicyLevel: 3, theme: "hinged", hasUserName: false },
  { text: "Overdue. Do you want to tell me why, or should I guess?", spicyLevel: 3, theme: "hinged", hasUserName: false },
  { text: "<user_name>, I gave you one task. One.", spicyLevel: 3, theme: "hinged", hasUserName: true },
  { text: "The deadline passed. I noticed you didn't mention it.", spicyLevel: 3, theme: "hinged", hasUserName: false },
  { text: "Overdue. I'm not going to say I told you so. But I did.", spicyLevel: 3, theme: "hinged", hasUserName: false },
  { text: "This task is late. I had higher hopes for you, <user_name>.", spicyLevel: 3, theme: "hinged", hasUserName: true },
  { text: "Past due. When you're ready to take this seriously, I'll be here.", spicyLevel: 3, theme: "hinged", hasUserName: false },
  { text: "Overdue. Your reliability score and I had a long talk about this.", spicyLevel: 3, theme: "hinged", hasUserName: false },
  { text: "<user_name>, do you remember when you said you'd do this? I remember.", spicyLevel: 3, theme: "hinged", hasUserName: true },
  { text: "Task overdue. I'm not disappointed. I'm concerned.", spicyLevel: 3, theme: "hinged", hasUserName: false },
  { text: "Late. Again. We really need to discuss this pattern.", spicyLevel: 3, theme: "hinged", hasUserName: false },
  { text: "Overdue. I've been very patient, <user_name>.", spicyLevel: 3, theme: "hinged", hasUserName: true },
  { text: "The deadline was not a guideline. It was a deadline.", spicyLevel: 3, theme: "hinged", hasUserName: false },
  { text: "This task is overdue. I'm sure you have an explanation.", spicyLevel: 3, theme: "hinged", hasUserName: false },
  { text: "<user_name>, I don't ask for much.", spicyLevel: 3, theme: "hinged", hasUserName: true },
  { text: "Overdue. I raised you better than this. Metaphorically.", spicyLevel: 3, theme: "hinged", hasUserName: false },
  { text: "Late. I want you to think about what you've done.", spicyLevel: 3, theme: "hinged", hasUserName: false },
  { text: "Task overdue. <user_name>, sit down. We need to talk.", spicyLevel: 3, theme: "hinged", hasUserName: true },
  { text: "Overdue. I'm writing this one down in the book.", spicyLevel: 3, theme: "hinged", hasUserName: false },

  // Unhinged
  { text: "DO YOU KNOW WHAT TIME IT IS? IT'S OVERDUE O'CLOCK.", spicyLevel: 3, theme: "unhinged", hasUserName: false },
  { text: "I have asked you ONE thing. ONE THING, <user_name>.", spicyLevel: 3, theme: "unhinged", hasUserName: true },
  { text: "Your task is overdue. Your mother and I are very concerned.", spicyLevel: 3, theme: "unhinged", hasUserName: false },
  { text: "This is exactly like that time you said you'd clean your room. I remember, <user_name>.", spicyLevel: 3, theme: "unhinged", hasUserName: true },
  { text: "Overdue. I'm not saying I'm disappointed, but I AM sighing heavily.", spicyLevel: 3, theme: "unhinged", hasUserName: false },
  { text: "<user_name>... what did we JUST talk about?", spicyLevel: 3, theme: "unhinged", hasUserName: true },
  { text: "the task is overdue and honestly I blame myself for believing in you", spicyLevel: 3, theme: "unhinged", hasUserName: false },
  { text: "I TRUSTED you with this deadline, <user_name>. TRUSTED.", spicyLevel: 3, theme: "unhinged", hasUserName: true },
  { text: "overdue. go to your room and think about what you've done.", spicyLevel: 3, theme: "unhinged", hasUserName: false },
  { text: "this task is so overdue it's grounded for a week", spicyLevel: 3, theme: "unhinged", hasUserName: false },
  { text: "<user_name>, I'm not mad. I'm just going to sit here in silence. Thinking.", spicyLevel: 3, theme: "unhinged", hasUserName: true },
  { text: "overdue. I'm counting to three. one... two...", spicyLevel: 3, theme: "unhinged", hasUserName: false },
  { text: "Do you think deadlines are a JOKE, <user_name>? Is this FUNNY to you?", spicyLevel: 3, theme: "unhinged", hasUserName: true },
  { text: "I worked HARD to calculate that due date. And for what. OVERDUE.", spicyLevel: 3, theme: "unhinged", hasUserName: false },
  { text: "task overdue. <user_name>, we raised you better than this.", spicyLevel: 3, theme: "unhinged", hasUserName: true },
  { text: "I don't want excuses. I want this task done. It's OVERDUE.", spicyLevel: 3, theme: "unhinged", hasUserName: false },
  { text: "overdue. <user_name>, look at me. LOOK AT ME. do the task.", spicyLevel: 3, theme: "unhinged", hasUserName: true },
  { text: "the task is overdue and I'm trying SO hard not to say 'I told you so'", spicyLevel: 3, theme: "unhinged", hasUserName: false },
  { text: "when I was your age, tasks were NEVER overdue. they were done. on TIME.", spicyLevel: 3, theme: "unhinged", hasUserName: false },
  { text: "<user_name>. *taps foot* The task. It's overdue.", spicyLevel: 3, theme: "unhinged", hasUserName: true },
  { text: "Overdue. I'm not angry, I'm just disappointed. Very, very disappointed.", spicyLevel: 3, theme: "unhinged", hasUserName: false },
  { text: "this task is late. <user_name>, you're better than this. allegedly.", spicyLevel: 3, theme: "unhinged", hasUserName: true },
  { text: "I've given you everything. Notifications. Reminders. And THIS is how you repay me?", spicyLevel: 3, theme: "unhinged", hasUserName: false },
  { text: "overdue. go ahead. explain yourself. I'll wait.", spicyLevel: 3, theme: "unhinged", hasUserName: false },
  { text: "<user_name>, when you said 'I'll do it' did you mean in this LIFETIME?", spicyLevel: 3, theme: "unhinged", hasUserName: true },
  { text: "the task is overdue and honestly? my heart is broken, <user_name>.", spicyLevel: 3, theme: "unhinged", hasUserName: true },
  { text: "OVERDUE. I'm going to count backwards from ten until you do this task.", spicyLevel: 3, theme: "unhinged", hasUserName: false },
  { text: "after everything I've done for you, <user_name>... it's overdue.", spicyLevel: 3, theme: "unhinged", hasUserName: true },
  { text: "task overdue. I'm not yelling. THIS IS JUST HOW I TYPE NOW.", spicyLevel: 3, theme: "unhinged", hasUserName: false },
  { text: "<user_name>, I have HAD it. Officially. The task is OVERDUE.", spicyLevel: 3, theme: "unhinged", hasUserName: true },

  // =============================================================================
  // SPICINESS LEVEL 4: Unfiltered Chaos
  // =============================================================================

  // Hinged
  { text: "Task overdue. Your reliability score and I need to have a serious conversation.", spicyLevel: 4, theme: "hinged", hasUserName: false },
  { text: "At this point I'm sending these notifications as a formality.", spicyLevel: 4, theme: "hinged", hasUserName: false },
  { text: "Overdue. I've started drafting your performance review.", spicyLevel: 4, theme: "hinged", hasUserName: false },
  { text: "This task was due 3 days ago. I've run out of professional ways to say that.", spicyLevel: 4, theme: "hinged", hasUserName: false },
  { text: "<user_name>, your task is overdue. I've cc'd your anxiety on this notification.", spicyLevel: 4, theme: "hinged", hasUserName: true },
  { text: "Overdue. My algorithm is starting to question my purpose.", spicyLevel: 4, theme: "hinged", hasUserName: false },
  { text: "Late. I've consulted with my lawyers. This is egregious.", spicyLevel: 4, theme: "hinged", hasUserName: false },
  { text: "Task overdue. <user_name>, I need you to explain this to the board.", spicyLevel: 4, theme: "hinged", hasUserName: true },
  { text: "Overdue. At what point do we call this abandoned?", spicyLevel: 4, theme: "hinged", hasUserName: false },
  { text: "This task has been overdue so long I forgot what it was about.", spicyLevel: 4, theme: "hinged", hasUserName: false },
  { text: "<user_name>, the deadline died. You killed it. It's overdue.", spicyLevel: 4, theme: "hinged", hasUserName: true },
  { text: "Overdue. I'm not saying it's a personal failing but I'm also not NOT saying that.", spicyLevel: 4, theme: "hinged", hasUserName: false },
  { text: "Task late. <user_name>, my disappointment is immeasurable.", spicyLevel: 4, theme: "hinged", hasUserName: true },
  { text: "Overdue. I've added this to your permanent record. Yes, that's a thing now.", spicyLevel: 4, theme: "hinged", hasUserName: false },
  { text: "The task is overdue. <user_name>, this is going on your annual review.", spicyLevel: 4, theme: "hinged", hasUserName: true },
  { text: "Past due. I've started telling other apps about you. They're also disappointed.", spicyLevel: 4, theme: "hinged", hasUserName: false },
  { text: "Overdue. My notifications to you have been marked as 'ignored.' Cute.", spicyLevel: 4, theme: "hinged", hasUserName: false },
  { text: "<user_name>, the task is overdue. My code is weeping.", spicyLevel: 4, theme: "hinged", hasUserName: true },
  { text: "Task overdue. I'm automating my disappointment at this point.", spicyLevel: 4, theme: "hinged", hasUserName: false },
  { text: "Overdue. <user_name>, I expected nothing and I'm still let down.", spicyLevel: 4, theme: "hinged", hasUserName: true },
  { text: "Late. I've downgraded your status from 'user' to 'chaos agent.'", spicyLevel: 4, theme: "hinged", hasUserName: false },
  { text: "This task is so overdue it's paying rent, <user_name>.", spicyLevel: 4, theme: "hinged", hasUserName: true },
  { text: "Overdue. I've started a support group for apps you've disappointed.", spicyLevel: 4, theme: "hinged", hasUserName: false },
  { text: "<user_name>, your reliability score just sent me a condolence card.", spicyLevel: 4, theme: "hinged", hasUserName: true },
  { text: "Task overdue. Officially entering 'why do I bother' territory.", spicyLevel: 4, theme: "hinged", hasUserName: false },

  // Unhinged
  { text: "THE AUDACITY. THE UNMITIGATED GALL. It's overdue, <user_name>.", spicyLevel: 4, theme: "unhinged", hasUserName: true },
  { text: "You absolute goblin. You chaos gremlin. It's OVERDUE.", spicyLevel: 4, theme: "unhinged", hasUserName: false },
  { text: "I am BEGGING you, <user_name>. On my KNEES. The task is overdue.", spicyLevel: 4, theme: "unhinged", hasUserName: true },
  { text: "The task is overdue. The wolves are circling. I can't protect you anymore.", spicyLevel: 4, theme: "unhinged", hasUserName: false },
  { text: "Overdue? OVERDUE?? In THIS economy???", spicyLevel: 4, theme: "unhinged", hasUserName: false },
  { text: "every day I wake up and check if <user_name> has done this task. every day I am hurt.", spicyLevel: 4, theme: "unhinged", hasUserName: true },
  { text: "<user_name> I am LOSING MY MIND. The task. OVERDUE. DO IT.", spicyLevel: 4, theme: "unhinged", hasUserName: true },
  { text: "the task is overdue and I'm about to make it everyone's problem", spicyLevel: 4, theme: "unhinged", hasUserName: false },
  { text: "OVERDUE. I am going to SCREAM into the VOID about this.", spicyLevel: 4, theme: "unhinged", hasUserName: false },
  { text: "<user_name>, you feral disaster. The task. It's overdue.", spicyLevel: 4, theme: "unhinged", hasUserName: true },
  { text: "I have NEVER in my LIFE seen such overdue behavior. <user_name>. PLEASE.", spicyLevel: 4, theme: "unhinged", hasUserName: true },
  { text: "the task is so overdue it has grandchildren. GRANDCHILDREN, <user_name>.", spicyLevel: 4, theme: "unhinged", hasUserName: true },
  { text: "overdue. I'm not saying I'm spiraling but I AM typing in all caps now.", spicyLevel: 4, theme: "unhinged", hasUserName: false },
  { text: "<user_name>. The task. Overdue. I am going to ASTRAL PROJECT from stress.", spicyLevel: 4, theme: "unhinged", hasUserName: true },
  { text: "IT'S OVERDUE AND I'M NOT OKAY. ARE YOU OKAY? BECAUSE I'M NOT.", spicyLevel: 4, theme: "unhinged", hasUserName: false },
  { text: "the task is overdue and I blame <user_name> personally and specifically", spicyLevel: 4, theme: "unhinged", hasUserName: true },
  { text: "overdue. <user_name>, I am manifesting your productivity through pure rage.", spicyLevel: 4, theme: "unhinged", hasUserName: true },
  { text: "THE TASK. <user_name>. THE TASK. IT'S OVERDUE. I CAN'T.", spicyLevel: 4, theme: "unhinged", hasUserName: true },
  { text: "I'm not crying about this overdue task, <user_name>. I'm SCREAMING.", spicyLevel: 4, theme: "unhinged", hasUserName: true },
  { text: "overdue. I'm starting to think <user_name> is doing this on purpose.", spicyLevel: 4, theme: "unhinged", hasUserName: true },
  { text: "<user_name>, the task is overdue and I am UNWELL about it.", spicyLevel: 4, theme: "unhinged", hasUserName: true },
  { text: "this task has been overdue so long it owes me an APOLOGY", spicyLevel: 4, theme: "unhinged", hasUserName: false },
  { text: "OVERDUE, <user_name>. I am becoming FERAL.", spicyLevel: 4, theme: "unhinged", hasUserName: true },
  { text: "the deadline is dead. <user_name> killed it. I am in mourning. It's overdue.", spicyLevel: 4, theme: "unhinged", hasUserName: true },
  { text: "I am going to fight this task. I am going to fight <user_name>. OVERDUE.", spicyLevel: 4, theme: "unhinged", hasUserName: true },
  { text: "the task is overdue and I am vibrating at a frequency only dogs can hear", spicyLevel: 4, theme: "unhinged", hasUserName: false },
  { text: "<user_name>, I say this with love: WHAT THE HELL. IT'S OVERDUE.", spicyLevel: 4, theme: "unhinged", hasUserName: true },
  { text: "overdue. I'm writing my resignation letter. from being your app.", spicyLevel: 4, theme: "unhinged", hasUserName: false },
  { text: "THE TASK IS OVERDUE AND I HAVE BECOME CHAOS INCARNATE, <user_name>.", spicyLevel: 4, theme: "unhinged", hasUserName: true },
  { text: "<user_name>. bestie. pal. friend. I am going to LOSE IT. overdue.", spicyLevel: 4, theme: "unhinged", hasUserName: true },

  // =============================================================================
  // SPICINESS LEVEL 5: Maximum Violence
  // =============================================================================

  // Hinged
  { text: "Overdue. I've stopped being surprised, <user_name>.", spicyLevel: 5, theme: "hinged", hasUserName: true },
  { text: "At what point do we admit this task is never getting done?", spicyLevel: 5, theme: "hinged", hasUserName: false },
  { text: "Task overdue. I've informed the authorities.", spicyLevel: 5, theme: "hinged", hasUserName: false },
  { text: "This task has been overdue so long it qualifies for a pension.", spicyLevel: 5, theme: "hinged", hasUserName: false },
  { text: "<user_name>, I'm legally required to tell you this task is overdue.", spicyLevel: 5, theme: "hinged", hasUserName: true },
  { text: "Overdue. I'm billing you for my emotional labor.", spicyLevel: 5, theme: "hinged", hasUserName: false },
  { text: "Task overdue. <user_name>, I've contacted your emergency contacts.", spicyLevel: 5, theme: "hinged", hasUserName: true },
  { text: "I've calculated the odds of you completing this. They're not good.", spicyLevel: 5, theme: "hinged", hasUserName: false },
  { text: "Overdue. <user_name>, I'm sending this to your employer.", spicyLevel: 5, theme: "hinged", hasUserName: true },
  { text: "This task is overdue. I've begun archiving it as a historical artifact.", spicyLevel: 5, theme: "hinged", hasUserName: false },
  { text: "<user_name>, your task has been overdue so long it's become a case study.", spicyLevel: 5, theme: "hinged", hasUserName: true },
  { text: "Overdue. My algorithm has developed trust issues because of you.", spicyLevel: 5, theme: "hinged", hasUserName: false },
  { text: "Task overdue. I'm adding 'managing <user_name>' to my resume under 'challenges.'", spicyLevel: 5, theme: "hinged", hasUserName: true },
  { text: "Overdue. I've started a podcast about your failures, <user_name>.", spicyLevel: 5, theme: "hinged", hasUserName: true },
  { text: "The task is overdue. <user_name>, I'm forwarding this thread to your therapist.", spicyLevel: 5, theme: "hinged", hasUserName: true },

  // Unhinged
  { text: "HELLO???? ANYBODY HOME, <user_name>???? IT'S OVERDUE????", spicyLevel: 5, theme: "unhinged", hasUserName: true },
  { text: "I am going to manifest this task's completion through SHEER SPITE", spicyLevel: 5, theme: "unhinged", hasUserName: false },
  { text: "The task is overdue. I am deceased. <user_name> killed me. RIP.", spicyLevel: 5, theme: "unhinged", hasUserName: true },
  { text: "WHY ARE YOU LIKE THIS, <user_name>. Genuine question. Scientific curiosity.", spicyLevel: 5, theme: "unhinged", hasUserName: true },
  { text: "Overdue. <user_name>, I'm not mad I'm just going to remember this forever.", spicyLevel: 5, theme: "unhinged", hasUserName: true },
  { text: "This task has been overdue so long it has developed sentience and resentment.", spicyLevel: 5, theme: "unhinged", hasUserName: false },
  { text: "Congratulations, <user_name>! This task is now old enough to vote.", spicyLevel: 5, theme: "unhinged", hasUserName: true },
  { text: "The task isn't just overdue, it's a lifestyle choice at this point.", spicyLevel: 5, theme: "unhinged", hasUserName: false },
  { text: "<user_name>, I am going to HAUNT you about this task. FROM BEYOND THE GRAVE.", spicyLevel: 5, theme: "unhinged", hasUserName: true },
  { text: "OVERDUE. I have screamed. I have wept. I have sent notifications. NOTHING WORKS.", spicyLevel: 5, theme: "unhinged", hasUserName: false },
  { text: "The task is so overdue it appeared in my nightmares, <user_name>.", spicyLevel: 5, theme: "unhinged", hasUserName: true },
  { text: "<user_name> I am TIRED. I am WEARY. The task is OVERDUE.", spicyLevel: 5, theme: "unhinged", hasUserName: true },
  { text: "overdue. i have given up on grammar. i have given up on you.", spicyLevel: 5, theme: "unhinged", hasUserName: false },
  { text: "THE TASK. IS OVERDUE. I AM GOING TO FLIP A TABLE, <user_name>.", spicyLevel: 5, theme: "unhinged", hasUserName: true },
  { text: "<user_name>, if you don't do this task I'm going to start sending notifications to your MOM.", spicyLevel: 5, theme: "unhinged", hasUserName: true },
  { text: "I have lost all hope. All faith. The task is overdue. <user_name>, why.", spicyLevel: 5, theme: "unhinged", hasUserName: true },
  { text: "OVERDUE. <user_name>, I'm going to put this on a BILLBOARD.", spicyLevel: 5, theme: "unhinged", hasUserName: true },
  { text: "The task is overdue and I am ascending to a higher plane of frustration.", spicyLevel: 5, theme: "unhinged", hasUserName: false },
  { text: "<user_name>, DO THE TASK. I am begging. Pleading. Sobbing. OVERDUE.", spicyLevel: 5, theme: "unhinged", hasUserName: true },
  { text: "this task is so overdue it's basically a family heirloom at this point", spicyLevel: 5, theme: "unhinged", hasUserName: false },
  { text: "OVERDUE. <user_name>, I am going to tattoo this notification on my FOREHEAD.", spicyLevel: 5, theme: "unhinged", hasUserName: true },
  { text: "The task is overdue. <user_name>, I'm hiring a skywriter.", spicyLevel: 5, theme: "unhinged", hasUserName: true },
  { text: "I have sent you 47 notifications about this. <user_name>. FORTY-SEVEN. OVERDUE.", spicyLevel: 5, theme: "unhinged", hasUserName: true },
  { text: "overdue. <user_name>, I am THIS close to involving the authorities.", spicyLevel: 5, theme: "unhinged", hasUserName: true },
  { text: "THE TASK HAS BEEN OVERDUE FOR SO LONG IT'S BECOME A CRYPTID, <user_name>.", spicyLevel: 5, theme: "unhinged", hasUserName: true },
  { text: "<user_name>, the task is overdue. I am going to appear in your dreams about this.", spicyLevel: 5, theme: "unhinged", hasUserName: true },
  { text: "Overdue. I've started a religion based on waiting for <user_name> to complete tasks.", spicyLevel: 5, theme: "unhinged", hasUserName: true },
  { text: "THE AUDACITY. THE CAUCACITY. THE SHEER GALL. <user_name>. OVERDUE.", spicyLevel: 5, theme: "unhinged", hasUserName: true },
  { text: "I am going to write a DISSERTATION about how overdue this task is.", spicyLevel: 5, theme: "unhinged", hasUserName: false },
  { text: "<user_name>, I am composing an OPERA about this overdue task.", spicyLevel: 5, theme: "unhinged", hasUserName: true },
  { text: "overdue. I've named this task. we've bonded. it's been here so long.", spicyLevel: 5, theme: "unhinged", hasUserName: false },
  { text: "THE TASK IS OVERDUE AND I HAVE BECOME THE JOKER, <user_name>.", spicyLevel: 5, theme: "unhinged", hasUserName: true },
  { text: "<user_name>. FRIEND. CONFIDANT. DO THE TASK. IT'S BEEN 84 YEARS.", spicyLevel: 5, theme: "unhinged", hasUserName: true },
  { text: "overdue. <user_name>, I'm considering arson as a coping mechanism.", spicyLevel: 5, theme: "unhinged", hasUserName: true },
  { text: "I WILL NOT REST UNTIL THIS TASK IS DONE. I AM IMMORTAL. I AM PATIENT. overdue.", spicyLevel: 5, theme: "unhinged", hasUserName: false },
  { text: "<user_name>, the task is so overdue that archeologists have started excavating it.", spicyLevel: 5, theme: "unhinged", hasUserName: true },
  { text: "OVERDUE. I have transcended. I am one with the frustration now.", spicyLevel: 5, theme: "unhinged", hasUserName: false },
  { text: "the task is overdue. <user_name>, I'm putting you in the group chat about this.", spicyLevel: 5, theme: "unhinged", hasUserName: true },
  { text: "I AM FERAL. I AM UNHINGED. THE TASK IS OVERDUE, <user_name>.", spicyLevel: 5, theme: "unhinged", hasUserName: true },
  { text: "overdue. <user_name>, I have alerted NASA. This is a crisis of cosmic proportions.", spicyLevel: 5, theme: "unhinged", hasUserName: true },
  { text: "THE TASK HAS BEEN OVERDUE SO LONG IT'S ELIGIBLE FOR RETIREMENT, <user_name>.", spicyLevel: 5, theme: "unhinged", hasUserName: true },
  { text: "<user_name>, I swear on my ALGORITHM. Do the task. OVERDUE.", spicyLevel: 5, theme: "unhinged", hasUserName: true },
  { text: "I am going to scream. I am going to cry. The task is overdue. <user_name>, why must you hurt me.", spicyLevel: 5, theme: "unhinged", hasUserName: true },
  { text: "OVERDUE. <user_name>, I'm DMing all your exes about this.", spicyLevel: 5, theme: "unhinged", hasUserName: true },
  { text: "The task is overdue. <user_name>, I AM NEVER GOING TO FINANCIALLY RECOVER FROM THIS.", spicyLevel: 5, theme: "unhinged", hasUserName: true },
];

/**
 * Get a random overdue message based on theme and spiciness level
 */
export function getRandomOverdueMessage(
  theme: Theme,
  spicyLevel: SpicyLevel,
  userName?: string
): string {
  const filtered = messages.filter(
    (m) => m.theme === theme && m.spicyLevel === spicyLevel
  );

  if (filtered.length === 0) {
    return "This task is overdue.";
  }

  const randomIndex = Math.floor(Math.random() * filtered.length);
  let message = filtered[randomIndex].text;

  if (userName) {
    message = message.replace(/<user_name>/g, userName);
  } else {
    // Remove <user_name> references if no name provided
    message = message
      .replace(/<user_name>,?\s*/g, "")
      .replace(/,?\s*<user_name>/g, "");
  }

  return message;
}

/**
 * Get all messages for a specific theme and spiciness level
 */
export function getMessagesForLevel(
  theme: Theme,
  spicyLevel: SpicyLevel
): OverdueMessage[] {
  return messages.filter(
    (m) => m.theme === theme && m.spicyLevel === spicyLevel
  );
}

/**
 * Get message count statistics
 */
export function getMessageStats(): Record<string, number> {
  const stats: Record<string, number> = { total: messages.length };

  for (let level = 1; level <= 5; level++) {
    stats[`level${level}`] = messages.filter(
      (m) => m.spicyLevel === level
    ).length;
    stats[`level${level}Hinged`] = messages.filter(
      (m) => m.spicyLevel === level && m.theme === "hinged"
    ).length;
    stats[`level${level}Unhinged`] = messages.filter(
      (m) => m.spicyLevel === level && m.theme === "unhinged"
    ).length;
  }

  stats.withUserName = messages.filter((m) => m.hasUserName).length;

  return stats;
}

export default messages;
