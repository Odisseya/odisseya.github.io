<?php

/**
 * @author          Tassos Marinos <info@tassos.gr>
 * @link            http://www.tassos.gr
 * @copyright       Copyright © 2018 Tassos Marinos All Rights Reserved
 * @license         GNU GPLv3 <http://www.gnu.org/licenses/gpl.html> or later
*/

namespace NRFramework;

defined('_JEXEC') or die('Restricted access');

class Updatesites
{
	/**
	 *  Joomla Database Class
	 *
	 *  @var  object
	 */
	private $db;

	/**
	 *  Consturction method
	 *
	 *  @param  string  $key  Download Key
	 */
	public function __construct($key = null)
	{
		$this->db  = \JFactory::getDBO();
		$this->key = ($key) ? $key : $this->getDownloadKey();
   	}

   	/**
   	 *  Main method
   	 */
   	public function update()
   	{
		$this->removeDuplicates();
		$this->updateHttptoHttps();
		$this->updateDownloadKey();
	}
	   
	/**
	 *  Reads the Download Key saved in the Novarain Framework system plugin parameters
	 *
	 *  @return  string  The Download Key
	 */
	public function getDownloadKey()
	{
		$query = $this->db->getQuery(true)
			->select('e.params')
			->from('#__extensions as e')
			->where('e.element = ' . $this->db->quote('nrframework'));

		$this->db->setQuery($query);

		if (!$params = $this->db->loadResult())
		{
			return;
		}

		$params = json_decode($params);

		if (!isset($params->key))
		{
			return;
		}

		return trim($params->key);
	}

	/**
	 *  Adds the user's Download Key as an extra query parameter to all entries
	 *
	 *  @param   string  $key  Download Key
	 */
	private function updateDownloadKey()
	{
		$query = $this->db->getQuery(true)
			->update('#__update_sites')
			->set($this->db->qn('extra_query') . ' = ' . $this->db->q('dlid=' . $this->key))
			->set($this->db->qn('enabled') . ' = 1')
			->where($this->db->qn('location') . ' LIKE ' . $this->db->q('%tassos.gr%'));

		$this->db->setQuery($query);
		$this->db->execute();
	}

	/**
	 * Update http to https
	 *
	 * @return void
	 */
	private function updateHttptoHttps()
	{
		$query = $this->db->getQuery(true)
			->update('#__update_sites')
			->set($this->db->quoteName('location') . ' = REPLACE('
				. $this->db->quoteName('location') . ', '
				. $this->db->quote('http://') . ', '
				. $this->db->quote('https://')
				. ')')
			->where($this->db->quoteName('location') . ' LIKE ' . $this->db->quote('%tassos.gr%'));
		$this->db->setQuery($query);
		$this->db->execute();
	}

	/**
	 * Remove duplicate update sites created by upgrading from Free to Pro version
	 *
	 * @return void
	 */
	private function removeDuplicates()
	{
		$db = $this->db;

		// Find duplicates first
		$query = 'SELECT name, COUNT(*) c FROM #__update_sites where location like "%tassos.gr%" GROUP BY name HAVING c > 1';
		$db->setQuery($query);

		if (!$duplicates = $db->loadObjectList())
		{
			return;
		}

		// OK we have duplicates. Let's remove them.
		foreach ($duplicates as $key => $duplicate)
		{
			// Get all IDs
			$query = $db->getQuery(true)
				->select('update_site_id')
				->from('#__update_sites')
				->where('name = ' . $db->quote($duplicate->name))
				->order('update_site_id DESC');

			$db->setQuery($query);

			if (!$update_site_ids = $db->loadObjectList())
			{
				return;
			}

			// Skip the 1st index which represents the last created and valid.
			unset($update_site_ids[0]);

			foreach ($update_site_ids as $key => $update_site_id)
			{
				$id = $update_site_id->update_site_id;

				$query->clear()
					->delete('#__update_sites')
					->where($db->quoteName('update_site_id') . ' = ' . (int) $id);

				$db->setQuery($query);
				$db->execute();
	
				$query->clear()
					->delete('#__update_sites_extensions')
					->where($db->quoteName('update_site_id') . ' = ' . (int) $id);

				$db->setQuery($query);
				$db->execute();
			}
		}
	}
}