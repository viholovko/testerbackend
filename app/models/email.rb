class Email < ApplicationRecord
  include Mongoid::Document
  include Mongoid::Timestamps
  include Mongoid::Paperclip

  field :email
  field :name, type: String, default: "no-name"
  field :origin
  field :status
  field :details
  field :created_at
  field :updated_at

  after_create :add_subsriber
  before_destroy :delete_subscriber

  validates :email, uniqueness: {case_sensitive: false, message: 'This email address is already registered.'},
            format: {with: /.*\@.*\..*/, message: 'is incorrect'},
            presence: true

  def self.search_query(params)
    query_params = {}

    query_params[:id] = params[:id] if params[:id].present?
    query_params[:email] = params[:email] if params[:email].present?
    query_params[:name] = params[:name] if params[:name].present?

    sort_column = params[:sort_column] || :created_at
    sort_type = params[:sort_type] || :desc

    Email.where(query_params)
           .order(sort_column => sort_type)
  end

  private

  def add_subsriber
    gibbon =Gibbon::Request.new(api_key: ENV['MAILCHIMP'])
    gibbon.timeout = 100
    gibbon.lists(ENV['MAILCHIMP_DISPATCH_LIST']).members.create(
        body: {
            email_address: self.email,
            status: "subscribed",
            merge_fields: {FNAME: self.name}
        })

    # VendortradeMailer.send_info_about_new_subscriber(self).deliver_now

  rescue Exception => e
    puts e.message
  end

  def delete_subscriber
    email_hash = Digest::MD5.hexdigest(self.email)
    gibbon =Gibbon::Request.new(api_key: ENV['MAILCHIMP'])
    gibbon.timeout = 100
    gibbon.lists(ENV['MAILCHIMP_DISPATCH_LIST']).members(email_hash).update(body: { status: "unsubscribed" })
    gibbon.lists(ENV['MAILCHIMP_DISPATCH_LIST']).members(email_hash).delete()
  rescue Exception => e
    puts e.message
  end

end
