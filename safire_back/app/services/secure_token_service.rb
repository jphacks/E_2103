class SecureTokenService
  class << self
    def issue_token
      SecureRandom.hex(64)
    end
  end
end