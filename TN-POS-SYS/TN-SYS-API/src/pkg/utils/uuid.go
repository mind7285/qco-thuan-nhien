package utils

import (
	"database/sql"

	"github.com/google/uuid"
)

// NullUUID Chuyển uuid.UUID sang interface{} để dùng với sql/gorm
func NullUUID(id interface{}) interface{} {
	if id == nil {
		return nil
	}

	switch v := id.(type) {
	case uuid.UUID:
		if v == uuid.Nil {
			return nil
		}
		return v
	case string:
		if v == "" {
			return nil
		}
		u, err := uuid.Parse(v)
		if err != nil {
			return nil
		}
		return u
	default:
		return nil
	}
}

// NullUUIDPtr Chuyển *uuid.UUID sang interface{} để dùng với sql/gorm
func NullUUIDPtr(id *uuid.UUID) interface{} {
	if id == nil || *id == uuid.Nil {
		return nil
	}
	return *id
}

// ToNullString Chuyển string sang sql.NullString
func ToNullString(s string) sql.NullString {
	if s == "" {
		return sql.NullString{Valid: false}
	}
	return sql.NullString{String: s, Valid: true}
}
