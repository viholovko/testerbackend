class PagesController < ApplicationController

  skip_before_action :authenticate_user

  def index
    render layout: 'admin'
  end

  def admin
    render layout: 'admin'
  end

end
