
"use client";
import { Button, Timeline, } from "keep-react";
import { ArrowRight, CalendarBlank } from "phosphor-react";

export const ResultTimeline = () => {
    return (
        <Timeline timelineBarType="dashed">
            <Timeline.Item >
                <Timeline.Point icon={<CalendarBlank size={16} />} />
                <Timeline.Content>
                    <Timeline.Time>February 2023</Timeline.Time>
                    <Timeline.Title>Application UI code in Tailwind CSS</Timeline.Title>
                    <Timeline.Body>
                        Get access to over 20+ pages including a dashboard layout, charts,
                        kanban board, calendar, and pre-order E-commerce & Marketing pages.
                    </Timeline.Body>

                </Timeline.Content>
            </Timeline.Item>

            <Timeline.Item>
                <Timeline.Point icon={<CalendarBlank size={16} />} />
                <Timeline.Content>
                    <Timeline.Time>March 2023</Timeline.Time>
                    <Timeline.Title>Marketing UI design in Figma</Timeline.Title>
                    <Timeline.Body>
                        All of the pages and components are first designed in Figma and we
                        keep a parity between the two versions even as we update the
                        project.
                    </Timeline.Body>
                </Timeline.Content>
            </Timeline.Item>
            <Timeline.Item >
                <Timeline.Point icon={<CalendarBlank size={16} />} />
                <Timeline.Content>
                    <Timeline.Time>April 2023</Timeline.Time>
                    <Timeline.Title>E-Commerce UI code in Tailwind CSS</Timeline.Title>
                    <Timeline.Body>
                        Get started with dozens of web components and interactive elements
                        built on top of Tailwind CSS.
                    </Timeline.Body>
                </Timeline.Content>
            </Timeline.Item>

        </Timeline>
    );

}
