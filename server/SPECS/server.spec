%define name server
%define version 1.0.0
%define release 1
%define buildroot %(mktemp -ud %{_tmppath}/%{name}-%{version}-%{release}-XXXXXX)

Name: %{name}
Version: %{version}
Release: %{release}
Summary: server

Group: Installation Script
License: ISC
Source: %{name}.tar.gz
BuildRoot: %{buildroot}
BuildArch: noarch
%global __strip /bin/true
%define __spec_build_post true
Requires: nodejs
AutoReqProv: no

%description


%prep
%setup -q -c -n %{name}

%build
npm prune --production
# skip npm rebuild

%pre
getent group server >/dev/null || groupadd -r server
getent passwd server >/dev/null || useradd -r -g server -G server -d / -s /sbin/nologin -c "server" server

%install
mkdir -p %{buildroot}/opt/server
cp -r ./* %{buildroot}/opt/server

%post

%clean
rm -rf %{buildroot}

%files
%defattr(644, server, server, 755)
/opt/server
