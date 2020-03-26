require 'test_helper'
require 'minitest/around/unit'
require 'webdrivers/chromedriver'

class ApplicationSystemTestCase < ActionDispatch::SystemTestCase
  driven_by :headless_chrome
  include Warden::Test::Helpers

  def allow_js_error(pattern, &block)
    pre_messages = page.driver.browser.manage.logs.get(:browser).map(&:message).reject { |message| js_error_ignored?(message) }
    raise pre_messages.first if pre_messages.any?

    block.call
    post_messages = page.driver.browser.manage.logs.get(:browser).map(&:message).reject { |m| pattern.is_a?(Regexp) ? pattern.match?(m) : m.include?(pattern) }.reject { |message| js_error_ignored?(message) }
    raise post_messages.first if post_messages.any?
  end

  def js_error_ignored?(err)
    err.include?('`SameSite=None` but without `Secure`')
  end

  teardown do
    page.driver.browser.manage.logs.get(:browser)
        .map(&:message)
        .reject { |message| js_error_ignored?(message) }
        .each do |message|
      raise "Browser console in #{method_name}: #{message}"
    end
  end
end

Capybara.server = :webrick

Capybara.register_driver :headless_chrome do |app|
  capabilities = Selenium::WebDriver::Remote::Capabilities.chrome(
    'goog:chromeOptions' => { args: ['verbose', 'disable-gpu', 'no-sandbox', 'disable-dev-shm-usage', 'window-size=1400,1400', ENV['HEADED'] == '1' ? nil : 'headless'].compact },
    'goog:loggingPrefs' => { browser: 'ALL' }
  )

  Capybara::Selenium::Driver.new app,
                                 browser: :chrome,
                                 desired_capabilities: capabilities
end
