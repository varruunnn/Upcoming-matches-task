import {
  Calendar,
  Trophy,
  Users,
  Clock,
  Medal,
  Target
} from 'lucide-react';

export function getApiEndpoints({ selectedCompetition, selectedTeam, selectedStatus, selectedMatchday }) {
  return [
    {
      id: 'matches',
      title: "Today's Matches",
      icon: Calendar,
      description: "See today's matches of subscribed competitions",
      endpoint: '/matches',
      color: 'bg-blue-500',
    },
    {
      id: 'competition-matches',
      title: 'Competition Matches',
      icon: Trophy,
      description: 'Get all matches of selected competition',
      endpoint: `/competitions/${selectedCompetition}/matches?status=${selectedStatus}`,
      color: 'bg-green-500',
    },
    {
      id: 'team-matches',
      title: 'Team Matches',
      icon: Users,
      description: 'See upcoming matches for selected team',
      endpoint: `/teams/${selectedTeam}/matches?status=SCHEDULED`,
      color: 'bg-purple-500',
    },
    {
      id: 'matchday',
      title: 'Matchday Schedule',
      icon: Clock,
      description: 'Check schedules for specific matchday',
      endpoint: `/competitions/${selectedCompetition}/matches?matchday=${selectedMatchday}`,
      color: 'bg-orange-500',
    },
    {
      id: 'standings',
      title: 'League Table',
      icon: Medal,
      description: 'Get the league table standings',
      endpoint: `/competitions/${selectedCompetition}/standings`,
      color: 'bg-red-500',
    },
    {
      id: 'scorers',
      title: 'Top Scorers',
      icon: Target,
      description: 'See best scorers of the league',
      endpoint: `/competitions/${selectedCompetition}/scorers`,
      color: 'bg-yellow-500',
    },
  ];
}
