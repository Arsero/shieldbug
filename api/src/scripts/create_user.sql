CREATE DATABASE shieldbug;
CREATE USER shielduser WITH PASSWORD 'shieldpwd';
GRANT ALL PRIVILEGES ON DATABASE shieldbug to shielduser;
COMMIT;