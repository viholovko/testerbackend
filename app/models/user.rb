class User < ApplicationRecord
  include Mongoid::Document
  include Mongoid::Timestamps
  include Mongoid::Paperclip

  field :email
  field :encrypted_password
  field :salt
  field :confirmed, type: Boolean, default: false
  field :confirmation_token
  field :reset_password_token
  field :social_type
  field :social_id
  field :title, default: ''
  field :first_name, default: ''
  field :last_name, default: ''
  field :birthday, type: DateTime
  field :created_at
  field :updated_at

  belongs_to :role

  has_mongoid_attached_file :avatar,
                            :default_url => '/assets/missing.png',
                            :styles => {
                                original: ['1920x1680>', :jpg],
                                small: ['100x100#', :jpg],
                                medium: ['250x250', :jpg],
                                large: ['500x500>', :jpg]
                            }

  validates_attachment_content_type :avatar, :content_type => /\Aimage\/.*\Z/

  has_many :sessions

  attr_accessor :password, :password_confirmation

  validates :email, uniqueness: {case_sensitive: false, message: 'This email address is already registered.'},
            format: {with: /.*\@.*\..*/, message: 'is incorrect'},
            presence: true

  before_save :encrypt_password
  before_validation :downcase_email
  after_create :send_confirmation_email

  validates :password, presence: true, confirmation: true, if: :validate_password?
  validates :password_confirmation, presence: true, if: :validate_password?

  scope :admins, -> {where(user.role.name.eql?('admin'))}
  scope :user, -> {where(user.role.name.eql?('user'))}

  def to_json
    {
        id: id.to_s,
        email: email,
        avatar: ENV['HOST'] + avatar.url,
        social_type: social_type,
        title: title,
        first_name: first_name,
        last_name: last_name,
        birthday: birthday,
    }
  end

  def to_short_json
    {
        id: id.to_s,
        email: email,
        avatar: ENV['HOST'] + avatar.url,
        social_type: social_type,
        title: title,
        first_name: first_name,
        last_name: last_name,
        birthday: birthday,
    }
  end

  def self.search_query(params, key)
    query_params = {}

    query_params[:id] = params[:id] if params[:id].present?
    query_params[:name] = %r{.*#{params[:name]}.*}i if params[:name].present?
    query_params[:email] = %r{.*#{params[:email]}.*}i if params[:email].present?

    if key
      query_params[:role_id] = Role.find_by name: "admin"
    else
      query_params[:role_id] = Role.find_by name: "user"
    end

    sort_column = params[:sort_column] || :created_at
    sort_type = params[:sort_type] || :desc

    User.where(query_params)
        .order(sort_column => sort_type)
  end

  def send_password_reset
    self.update_attribute :reset_password_token, encrypt(Time.now.to_s)
    UserMailer.password_reset(self).deliver_now
  rescue Exception => e
    puts e.message
  end

  def authenticate(password)
    self.encrypted_password == encrypt(password)
  end

  def destroy
    raise 'Cannot destroy last admin' if self.admin? && User.admins.count <= 1
    super
  end

  def send_email_user_seccessfully_created
    UserMailer.send_email_user_seccessfully_created(self).deliver_now
  end

  private

  def validate_password?
    password.present? || password_confirmation.present?
  end

  def send_confirmation_email
    return if self.confirmed

    self.update_attribute :confirmation_token, encrypt(self.email)
    UserMailer.confirmation_instructions(self).deliver_now
  rescue Exception => e
    puts e.message
  end

  def downcase_email
    self.email = self.email.downcase if self.email
  end

  def encrypt_password
    self.salt = make_salt if salt.blank?
    self.encrypted_password = encrypt(self.password) if self.password
  end

  def encrypt(string)
    secure_hash("#{string}--#{self.salt}")
  end

  def make_salt
    secure_hash("#{Time.now.utc}--#{self.password}")
  end

  def secure_hash(string)
    Digest::SHA2.hexdigest(string)
  end
end
