import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import type { Event } from "../types/event";
import { eventApi } from "../services/api";
import { parseISO, isValid } from "date-fns";

import ArchivedEvents from "./ArchivedEvents";

const ArchivedEventsPage: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch events on component mount
  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const response = await eventApi.getAllEvents();
      console.log("Fetched events from API:", response);

      // Extract events from the response structure { meta, result: Event[] }
      const fetchedEvents = response.result;

      // Sort events by date and time (ascending)
      const sortedEvents = fetchedEvents.sort((a, b) => {
        try {
          const dateA = parseISO(`${a.date || ""}T${a.time || ""}`);
          const dateB = parseISO(`${b.date || ""}T${b.time || ""}`);

          if (!isValid(dateA) || !isValid(dateB)) {
            return 0; // Keep original order if dates are invalid
          }

          return dateA.getTime() - dateB.getTime();
        } catch {
          return 0; // Keep original order if parsing fails
        }
      });
      setEvents(sortedEvents);
      setError(null);
    } catch (err) {
      setError("Failed to fetch events");
      console.error("Error fetching events:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleUnarchiveEvent = async (id: string) => {
    try {
      const updatedEvent = await eventApi.archiveEvent(id);
      setEvents((prev) =>
        prev.map((event) =>
          event._id === id || event.id === id ? updatedEvent : event
        )
      );
    } catch (err) {
      setError("Failed to unarchive event");
      console.error("Error unarchiving event:", err);
    }
  };

  const handleDeleteEvent = async (id: string) => {
    try {
      await eventApi.deleteEvent(id);
      setEvents((prev) =>
        prev.filter((event) => event._id !== id && event.id !== id)
      );
    } catch (err) {
      setError("Failed to delete event");
      console.error("Error deleting event:", err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading archived events...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Link
              to="/"
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200"
            >
              <svg
                className="w-4 h-4 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              Back to Events
            </Link>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Archived Events
          </h1>
          <p className="text-lg text-gray-600">
            View and manage your archived events
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-red-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-800">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Archived Events List */}
        <ArchivedEvents
          events={events}
          onUnarchive={handleUnarchiveEvent}
          onDelete={handleDeleteEvent}
        />
      </div>
    </div>
  );
};

export default ArchivedEventsPage;
