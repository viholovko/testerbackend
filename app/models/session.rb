class Session < ApplicationRecord
  include Mongoid::Document
  include Mongoid::Timestamps
  include Mongoid::Paperclip

  field :token
  field :push_token
  field :device_type
  field :created_at
  field :updated_at

  belongs_to :user
  before_create :generate_token, :clean_up_same_devices

  def self.destroy_expired
    where('updated_at < ?', Time.now - 24.hours).destroy_all
  end

  private

  def generate_token
    self.token = encrypt
  end

  def encrypt
    secure_hash("#{Time.now.utc - (rand(1000).hours)}--#{self.user.email}--#{self.user.salt}")
  end

  def secure_hash(string)
    Digest::SHA2.hexdigest(string)
  end

  def clean_up_same_devices
    if push_token.present?
      Session.where(push_token: push_token).destroy_all
    end
  end

end