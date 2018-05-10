class Test < ApplicationRecord
  include Mongoid::Document
  include Mongoid::Timestamps
  include Mongoid::Paperclip

  # TEST_TYPES = %w[radio checkbox answer].freeze

  field :title, type: String
  field :description, type: String
  field :status, type: Boolean, default: false
  field :created_at
  field :updated_at

  def self.search_query(params)
    query_params = {}

    query_params[:id] = params[:id] if params[:id].present?
    query_params[:title] = %r{.*#{params[:title]}.*}i if params[:title].present?
    query_params[:description] = %r{.*#{params[:description]}.*}i if params[:description].present?
    q.where(tests[:status].eq(params[:status]))              if params[:status].present?
    q.where(tests[:type].eq(params[:type]))                  if params[:type].present?

    sort_column = params[:sort_column] || :created_at
    sort_type = params[:sort_type] || :desc

    Test.where(query_params).order(sort_column => sort_type)
  end

end
