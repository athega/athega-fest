# encoding: utf-8

require 'yajl'

require_relative 'mailer'

class Notification

  def self.send_all_pending_invitations!
    # Config
    from     = 'athega@athega.se'
    subject  = 'Välkommen till Athegas 20-årskalas'

    # Get the templates
    template = IO.read('views/notifications/invitation.haml')
    renderer = Haml::Engine.new(template).render_proc({}, :link, :name, :company, :invited_by)

    sent_count = 0

    Guest.not_invited_yet.not_invited_manually.sort([:company, 1], [:name, 1]).limit(50).each do |g|
      html = renderer.call link:       g.token_uri,
                           name:       g.name,
                           company:    g.company,
                           invited_by: g.invited_by

      text     = html.gsub(/<\/?[^>]*>/, "")
      response = Mailer.mail(from, g.email, subject, text, html)

      if response["message"] == "Queued. Thank you."
        g.invitation_email_sent = true
        g.save

        sent_count += 1
      end
    end

    sent_count
  end

  def self.send_all_pending_reminders!
    # Config
    from     = 'athega@athega.se'
    subject  = 'Du har väl inte missat att Athegas fyller 20?'

    # Get the templates
    template = IO.read('views/notifications/reminder.haml')
    renderer = Haml::Engine.new(template).render_proc({}, :link, :name, :company, :invited_by)

    sent_count = 0

    Guest.not_reminded_yet.not_rsvped.sort([:company, 1], [:name, 1]).limit(50).each do |g|
      html = renderer.call link:       g.token_uri,
                           name:       g.name,
                           company:    g.company,
                           invited_by: g.invited_by

      text     = html.gsub(/<\/?[^>]*>/, "")
      response = Mailer.mail(from, g.email, subject, text, html)

      if response["message"] == "Queued. Thank you."
        g.reminder_email_sent = true
        g.save

        sent_count += 1
      end
    end

    sent_count
  end

  def self.send_all_pending_welcomes!
    # Config
    from     = 'athega@athega.se'
    subject  = 'Kul att du vill komma på Athegas 20-årskalas'

    # Get the templates
    template = IO.read('views/notifications/welcome.haml')
    renderer = Haml::Engine.new(template).render_proc({}, :name, :company, :invited_by, :sitting)

    sent_count = 0

    Guest.said_yes.not_welcomed_yet.sort([:company, 1], [:name, 1]).limit(50).each do |g|
      html = renderer.call name:       g.name,
                           company:    g.company,
                           invited_by: g.invited_by,
                           sitting:    g.sitting

      text     = html.gsub(/<\/?[^>]*>/, "")
      response = Mailer.mail(from, g.email, subject, text, html)

      if response["message"] == "Queued. Thank you."
        g.welcome_email_sent = true
        g.save

        sent_count += 1
      end
    end

    sent_count
  end

  def self.send_all_pending_thank_you_notes!
    from     = 'athega@athega.se'
    subject  = 'Tack för att du firade med oss'

    template = IO.read('views/notifications/thank_you.haml')
    renderer = Haml::Engine.new(template).render_proc({}, :arrived, :athega, :wikipedia, :dafla_true, :dafla_false, :athegamannen, :johnny_bravo, :perl_true, :perl_false, :javascript, :java, :go, :ruby)

    sent_count = 0

    Guest.said_yes.not_thanked_yet.sort([:company, 1], [:name, 1]).limit(50).each do |g|
      html = renderer.call arrived:      g.arrived,
                           athega:       g.athega || 0,
                           wikipedia:    g.wikipedia || 0,
                           dafla_true:   g.dafla_true || 0,
                           dafla_false:  g.dafla_false || 0,
                           athegamannen: g.athegamannen || 0,
                           johnny_bravo: g.johnny_bravo || 0,
                           perl_true:    g.perl_true || 0,
                           perl_false:   g.perl_false || 0,
                           javascript:   g.javascript || 0,
                           java:         g.java || 0,
                           go:           g.go || 0,
                           ruby:         g.ruby || 0

      text = html.gsub(/<\/?[^>]*>/, "")
      response = Mailer.mail(
          from,
          g.email,
          g.arrived ? subject : 'Filmen från Athegas 20-årskalas',
          text,
          html
      )

      if response["message"] == "Queued. Thank you."
        g.thank_you_email_sent = true
        g.save

        sent_count += 1
      end
    end

    sent_count
  end
end
