# encoding: UTF-8

class Guest
  inherit Mongo::Model

  collection "guests_#{Time.now.year}"

  attr_accessor :name, :company, :email, :image_url
  attr_accessor :invited_by, :sitting_key, :status, :token
  attr_accessor :invited_manually, :invitation_email_sent, :thank_you_email_sent, :welcome_email_sent
  attr_accessor :arrived, :arrived_at, :departed, :departed_at
  attr_accessor :image_url, :rfid
  attr_accessor :mulled_wine, :food, :drink, :coffee

  scope :invited_manually, invited_manually: true
  scope :not_invited_manually, invited_manually: false

  scope :not_invited_yet,  invitation_email_sent: false, invited_manually: false
  scope :not_arrived_yet,  arrived:  false, sitting_key: { _in: [1130, 1200, 1230, 1300, 1330] }
  scope :not_welcomed_yet, welcome_email_sent: nil
  scope :not_thanked_yet, thank_you_email_sent: nil

  scope :arrived, arrived: true
  scope :departed, departed: true
  scope :invited, invitation_email_sent: true
  scope :welcomed, welcome_email_sent: true
  scope :thanked, thank_you_email_sent: true
  scope :said_yes, sitting_key: { _in: [1130, 1200, 1230, 1300, 1330] }

  scope :untagged, rfid: nil

  validates_presence_of :name
  validates_presence_of :company
  validates_presence_of :email
  validates_presence_of :invited_by

  def has_checked_sitting?(sitting)
    sitting_key == sitting.key
  end

  def thumbnail_url
    image_url.nil? ? '' : image_url.gsub('hatified', 'thumb')
  end

  def sitting
    s = Sitting.by_key(sitting_key)

    if s.nil?
      'Ej valt'
    else
      declined? ? 'Nej' : s.title
    end
  end

  def status_string
    output = 'Inte fått inbjudan än'

    if invitation_email_sent
      output  = 'Fått inbjudan'
      output += ', blivit välkomnad' if welcome_email_sent
      output += ', blivit tackad' if thank_you_email_sent
      output += ', har dykt upp' if arrived
      output += ' och lämnat Jullunchen' if departed
    end

    output
  end

  def css_classes
    "guest #{sitting_class} #{invite_class}"
  end

  def declined?
    sitting_key == 0
  end

  def coming?
    !sitting_key.nil? && sitting_key > 0
  end

  def token_uri
    "http://fest.athega.se/?token=#{token}"
  end

  protected

  def set_default_values
    @token                  = _id if @token.nil?
    @invited_manually       = false if @invited_manually.nil?
    @invitation_email_sent  = false
    @arrived                = false
    @departed               = false
    @mulled_wine            = 0
    @food                   = 0
    @drink                  = 0
    @coffee                 = 0

    save
  end

  after_create :set_default_values

  private

  def sitting_class
    {
      0    => 'declined',
      1130 => 'sitting-1130',
      1200 => 'sitting-1200',
      1230 => 'sitting-1230',
      1300 => 'sitting-1300',
      1330 => 'sitting-1330'
    }[sitting_key] || 'no-response'
  end

  def invite_class
    invited_manually == true ? 'manual' : 'auto'
  end
end

