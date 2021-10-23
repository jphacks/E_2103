# config valid for current version and patch releases of Capistrano
lock "~> 3.16.0"

# set :application, "E_2103"
# set :repo_url, "https://github.com/jphacks/E_2103"
# set :branch, "dev/back_0"
# set :deploy_to, "/var/www/#{fetch :application}/safire_back"

# Default branch is :master
# ask :branch, `git rev-parse --abbrev-ref HEAD`.chomp

# Default deploy_to directory is /var/www/my_app_name
# set :deploy_to, "/var/www/my_app_name"

# Default value for :format is :airbrussh.
# set :format, :airbrussh

# You can configure the Airbrussh format using :format_options.
# These are the defaults.
# set :format_options, command_output: true, log_file: "log/capistrano.log", color: :auto, truncate: :auto

# Default value for :pty is false
# set :pty, true

# Default value for :linked_files is []
# append :linked_files, "config/database.yml"
<<<<<<< HEAD
# append :linked_files, "config/master.key"

=======
append :linked_files, "config/master.key"
set :linked_files, fetch(:linked_files, []).push("config/master.key")
>>>>>>> c1ea321 (Fixed some settings for CI/CD)

# Default value for linked_dirs is []
# append :linked_dirs, "log", "tmp/pids", "tmp/cache", "tmp/sockets", "vendor/bundle", "public/system", "public/uploads", "public/assets", ".bundle"

# Default value for default_env is {}
# set :default_env, { path: "/opt/ruby/bin:$PATH" }

# Default value for local_user is ENV['USER']
# set :local_user, -> { `git config user.name`.chomp }

# Default value for keep_releases is 5
# set :keep_releases, 5

# Uncomment the following to require manually verifying the host key before first deploy.
# set :ssh_options, verify_host_key: :secure
<<<<<<< HEAD
# set :ssh_options, {
#   auth_methods: ['publickey'], 
#   keys: ['~/.ssh/aws/AmazonLinux2.pem'] 
# }

# set :rbenv_type, :user
# set :rbenv_ruby, '2.5.1'

# set :rbenv_ruby_version, '2.5.1'
# set :rbenv_path, '~/.rbenv' #指定するとこのパスは以下のbundleが、指定しないと$HOME配下のbundleが実行された
# set :bundle_path, './vendor/bundle'
# set :rbenv_prefix, "RBENV_ROOT=#{fetch(:rbenv_path)} #{fetch(:rbenv_path)}/bin/rbenv exec"
=======
set :ssh_options, {
  auth_methods: ['publickey'], 
  keys: ['~/.ssh/aws/AmazonLinux2.pem'] 
}

set :rbenv_type, :user
set :rbenv_ruby, '2.5.1'

# set :rbenv_ruby_version, '2.5.1'
set :rbenv_path, '~/.rbenv' #指定するとこのパスは以下のbundleが、指定しないと$HOME配下のbundleが実行された
set :bundle_path, './vendor/bundle'
set :rbenv_prefix, "RBENV_ROOT=#{fetch(:rbenv_path)} #{fetch(:rbenv_path)}/bin/rbenv exec"
>>>>>>> c1ea321 (Fixed some settings for CI/CD)
