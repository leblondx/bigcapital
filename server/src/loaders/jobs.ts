import Agenda from 'agenda';
import WelcomeEmailJob from '@/jobs/WelcomeEmail';
import WelcomeSMSJob from '@/jobs/WelcomeSMS';
import ResetPasswordMailJob from '@/jobs/ResetPasswordMail';
import ComputeItemCost from '@/jobs/ComputeItemCost';
import RewriteInvoicesJournalEntries from '@/jobs/writeInvoicesJEntries';
import SendLicenseViaPhoneJob from '@/jobs/SendLicensePhone';
import SendLicenseViaEmailJob from '@/jobs/SendLicenseEmail';
import SendSMSNotificationSubscribeEnd from '@/jobs/SMSNotificationSubscribeEnd';
import SendSMSNotificationTrialEnd from '@/jobs/SMSNotificationTrialEnd';
import SendMailNotificationSubscribeEnd from '@/jobs/MailNotificationSubscribeEnd';
import SendMailNotificationTrialEnd from '@/jobs/MailNotificationTrialEnd';
import UserInviteMailJob from '@/jobs/UserInviteMail';

export default ({ agenda }: { agenda: Agenda }) => {
  new WelcomeEmailJob(agenda);
  new ResetPasswordMailJob(agenda);
  new WelcomeSMSJob(agenda);
  
  // User invite mail.
  agenda.define(
    'user-invite-mail',
    { priority: 'high' },
    new UserInviteMailJob().handler,
  )
  agenda.define(
    'compute-item-cost',
    { priority: 'high', concurrency: 20 },
    new ComputeItemCost(agenda).handler,
  );
  agenda.define(
    'rewrite-invoices-journal-entries',
    { priority: 'normal', concurrency: 1, },
    new RewriteInvoicesJournalEntries(agenda).handler,
  );
  agenda.define(
    'send-license-via-phone',
    { priority: 'high', concurrency: 1, },
    new SendLicenseViaPhoneJob().handler,
  );
  agenda.define(
    'send-license-via-email',
    { priority: 'high', concurrency: 1, },
    new SendLicenseViaEmailJob().handler,
  );
  agenda.define(
    'send-sms-notification-subscribe-end',
    { priority: 'nromal', concurrency: 1, },
    new SendSMSNotificationSubscribeEnd().handler,
  );
  agenda.define(
    'send-sms-notification-trial-end',
    { priority: 'normal', concurrency: 1, },
    new SendSMSNotificationTrialEnd().handler,
  );
  agenda.define(
    'send-mail-notification-subscribe-end',
    { priority: 'high', concurrency: 1, },
    new SendMailNotificationSubscribeEnd().handler
  );
  agenda.define(
    'send-mail-notification-trial-end',
    { priority: 'high', concurrency: 1, },
    new SendMailNotificationTrialEnd().handler
  );
  agenda.start();
};